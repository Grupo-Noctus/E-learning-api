import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InscricaoDTO } from "src/curso/dto/inscricao.dto";
import { Inscricao } from "src/curso/Entity/inscricao.entity";
import { Status } from "src/curso/Entity/statusEnum";
import { AlunoService } from "src/usuario/aluno.service";
import { DataSource, Repository } from "typeorm";
import { CursoService } from "./curso.service";
import { Progresso } from "./Entity/progresso.entity";
import { Aluno } from "src/usuario/Entity/aluno.entity";
import { Curso } from "./Entity/curso.entity";

@Injectable()
export class InscricaoService {
  constructor(
    @InjectRepository(Inscricao)
    private readonly inscricaoRepository: Repository<Inscricao>,
    private readonly alunoService: AlunoService,
    private readonly dataSource: DataSource,
  ) { }

  //refatoração ok
  async fazerInscricao(inscricaoDto: InscricaoDTO): Promise<{ message: string }> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction();

    try{
      const aluno = await queryRunner.manager.findOne(Aluno, {
        where: {
          matricula: inscricaoDto.id_aluno
        }
      });
      if(!aluno){
        throw new NotFoundException(`Matricula ${inscricaoDto.id_aluno} não encontrada!`);
      }

      const curso = await queryRunner.manager.findOne(Curso, {
        where:{
          id_curso: inscricaoDto.id_curso
        }
      });
      if(!curso){
        throw new NotFoundException(`Curso ${inscricaoDto.id_curso} não encontrado!`);
      }

      const inscricaoExiste = await queryRunner.manager.findOne(Inscricao, {
        where: {
          curso: curso,
          aluno: aluno,
        }
      });
      if(inscricaoExiste){
        throw new BadRequestException("O aluno já está inscrito no curso!");
      }

      const novaIncricao = await this.inscricaoRepository.create({
        aluno: aluno,
        curso: curso
      });

      await queryRunner.manager.save(Inscricao, novaIncricao);
      await queryRunner.commitTransaction();
      return{ message: "A inscrição foi realizada com sucesso!"};
    }catch(error){
      await queryRunner.rollbackTransaction();
      console.log("Erro ao fazer a inscrição: ", error);
      throw new BadRequestException("Inscrição não realizada!")
    }finally{
      await queryRunner.release();
    }
  }

  //refatoração ok
  async buscarIncrição(id_inscricao: number): Promise<Inscricao> {
    const verificacao = await this.inscricaoRepository.findOne({
      where: { id_inscricao },
      relations: ['curso']
    });
    if (!verificacao) {
      throw new NotFoundException(`Inscrição com id: ${id_inscricao} não encontrado.`);
    }
    return verificacao;
  }

  //refatoração ok
  async incluirProgresso(progresso: Progresso, inscricao: Inscricao) {
    if (!inscricao.progresso) {
      inscricao.progresso = [];
    }
    inscricao.progresso.push(progresso);
  
    await this.inscricaoRepository.save(inscricao);
  }
  
}