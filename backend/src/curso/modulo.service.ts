import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, In, Repository } from "typeorm";
import { Modulo } from "./Entity/modulo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ModuloDTO } from "./dto/modulo.dto";
import { ProgressoDTO } from "./dto/progresso.dto";
import { Curso } from "./Entity/curso.entity";
import { Inscricao } from "./Entity/inscricao.entity";
import { Progresso } from "./Entity/progresso.entity";
import { Status } from "./Entity/statusEnum";
import { InscricaoService } from "./inscricao.service";

@Injectable()
export class ModuloService {
    constructor(
        @InjectRepository(Modulo)
        private readonly moduloRepository: Repository<Modulo>,
        @InjectRepository(Progresso)
        private readonly progressoRepository: Repository<Progresso>,
        @InjectRepository(Inscricao)
        private readonly inscricaoRepository: Repository<Inscricao>,
        private readonly dataSource: DataSource
    ) { }

    async criarModulo(moduloDto: ModuloDTO): Promise<{ message: string }> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const curso = await queryRunner.manager.findOne(Curso, { where: { id_curso: moduloDto.id_curso } });
            if (!curso) {
                throw new NotFoundException(`Curso com ID ${moduloDto.id_curso} não encontrado.`);
            }

            const moduloExistente = await queryRunner.manager.findOne(Modulo, {
                where: {
                    curso: { id_curso: moduloDto.id_curso },
                    ordem: moduloDto.ordem,
                },
            });
            if (moduloExistente) {
                throw new BadRequestException('Essa ordem já está sendo usada neste curso!');
            }

            const novoModulo = this.moduloRepository.create({
                titulo: moduloDto.titulo,
                descricao: moduloDto.descricao,
                ordem: moduloDto.ordem,
                curso: curso,
            });

            await queryRunner.manager.save(Modulo, novoModulo);
            await queryRunner.commitTransaction();
            return { message: 'Módulo cadastrado com sucesso!' };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Erro ao criar módulo:', error);
            throw new Error('Não foi possível cadastrar o módulo.');
        } finally {
            await queryRunner.release();
        }
    }

    async concluirModulo(progressoDto: ProgressoDTO): Promise<{ message: string }> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const inscricao = await queryRunner.manager.findOne(Inscricao, { 
                where: { 
                    id_inscricao: progressoDto.id_inscricao 
                }, 
                relations: ['curso'],
            })
            if (!inscricao) { throw new NotFoundException(`A inscrição de id ${progressoDto.id_inscricao} não existe.`); }
            console.log('ProgressoDTO recebido:', progressoDto);
            console.log('Inscrição encontrada:', inscricao);
            if (inscricao) console.log('Curso da inscrição:', inscricao.curso);
            const moduloCurso = await queryRunner.manager.findOne(Modulo, {
                where: {
                    curso: { id_curso: inscricao.curso.id_curso },
                    id_modulo: progressoDto.id_modulo
                },
            });
            if (!moduloCurso) {
                throw new NotFoundException(`O modulo de ${progressoDto.id_modulo} não existe na inscrição de id ${progressoDto.id_inscricao}`);
            }

            const novoProgresso = await this.progressoRepository.create({
                inscricao: inscricao,
                modulo: moduloCurso
            })

            await queryRunner.manager.save(Progresso, novoProgresso)
            await queryRunner.commitTransaction();
            return { message: "Modulo concluido." }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("Erro ao concluir modulo:", error);
            throw new Error('Não foi possível concluir o módulo.')
        } finally {
            await queryRunner.release();
        }
    }

    async buscarProgresso(id_inscricao: number): Promise<Progresso[]> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
    
        try {
            console.log(`Buscando progressos para inscrição ID: ${id_inscricao}`);
            
            const modulosConcluidos = await queryRunner.manager.find(Progresso, {
                where: {
                    inscricao: { id_inscricao }, // Relacionamento explícito com a inscrição
                },
                relations: ['inscricao', 'modulo'], // Carrega as relações
            });
    
            console.log("Módulos concluídos encontrados:", modulosConcluidos);
            return modulosConcluidos;
        } catch (error) {
            console.error("Erro ao buscar os módulos concluídos:", error);
            throw new Error("Não foi possível realizar a query.");
        } finally {
            await queryRunner.release();
        }
    }

    async reordenarModulos(cursoId: number, novosModulos: { id_modulo: number, ordem: number }[]): Promise<{ message: String}> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            const curso = await queryRunner.manager.findOne(Curso, { where: { id_curso: cursoId } });
            if (!curso) {
                throw new Error('Curso não encontrado');
            }
    
            const modulosIds = novosModulos.map(modulo => modulo.id_modulo);
            const modulos = await queryRunner.manager.find(Modulo, {
                where: { id_modulo: In(modulosIds), curso: curso },
            });
    
            if (modulos.length !== novosModulos.length) {
                throw new Error('Um ou mais módulos não pertencem ao curso ou não existem');
            }

            const ordens = novosModulos.map(modulo => modulo.ordem);
            const ordensUnicas = new Set(ordens);
            if (ordens.length !== ordensUnicas.size) {
                throw new Error('As ordens fornecidas não são únicas');
            }
            novosModulos.sort((a, b) => a.ordem - b.ordem);
    
            for (const { id_modulo, ordem } of novosModulos) {
                await queryRunner.manager.update(Modulo, { id_modulo }, { ordem });
            }

            await queryRunner.commitTransaction();
            return { message: "Modulos reordenados"};
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log("Erro ao reordenar módulos:", error);
            throw new Error(error.message || "Não foi possível reordenar os módulos");
        } finally {
            await queryRunner.release();
        }
    }
    
    
}