import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
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
            const inscricao = await queryRunner.manager.findOne(Inscricao, { where: { id_inscricao: progressoDto.id_inscricao } })
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

            inscricao.status = Status.CONCLUIDO;
            await queryRunner.manager.save(inscricao);

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
}