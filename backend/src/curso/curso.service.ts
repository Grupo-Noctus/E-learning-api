import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './Entity/curso.entity';
import { DataSource, Repository } from 'typeorm';
import { CursoDTO } from './dto/curso.dto';
import { InstrutorService } from 'src/usuario/instrutor.service';
import { AvaliacaoDTO } from './dto/avaliacao.dto';
import { InscricaoService } from './inscricao.service';
import { Avaliacao } from './Entity/avaliacao.entity';
import { CursoUpadateDTO } from './dto/cursoUpadate.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly curso: Repository<Curso>,
    @InjectRepository(Avaliacao)
    private readonly avaliacao: Repository<Avaliacao>,
    private readonly dataSource: DataSource,
    private readonly instrutorService: InstrutorService,
    private readonly inscricaoService: InscricaoService,
  ) {}

  //refatoração ok
  async criarCurso(cursoDto: CursoDTO): Promise<{ message: string }> {
    const curso = new Curso();

    try {
      curso.titulo = cursoDto.titulo;
      curso.descricao = cursoDto.descricao;
      curso.imagem = cursoDto.imagem;
      curso.instrutor = await this.instrutorService.buscarInstrutor(
        cursoDto.id_instrutor,
      );

      await this.curso.save(curso);

      return { message: 'Curso cadastrado com sucesso!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Erro ao criar curso:', error);
      throw new Error('Não foi possível criar o curso.');
    }
  }

  //refatoração ok
  async buscarTodosCurso(): Promise<Curso[]> {
    return await this.curso.find();
  }

  //refatoração ok
  async buscarCurso(id_curso: number): Promise<Curso> {
    const curso = await this.curso.findOne({
      where: { id_curso },
    });

    if (!curso) {
      throw new NotFoundException(`Curso com id: ${id_curso} não encontrado.`);
    }
    return curso;
  }

  //refatoração ok
  async avaliarCurso(avaliacaoDto: AvaliacaoDTO): Promise<{ message: string }> {
    const avaliacao = new Avaliacao();

    try {
      const inscricao = await this.inscricaoService.buscarIncrição(
        avaliacaoDto.id_inscricao,
      );
      avaliacao.inscricao = inscricao;
      avaliacao.nota = avaliacaoDto.nota;
      avaliacao.comentário = avaliacaoDto.comentario;
      await this.avaliacao.save(avaliacao);

      return { message: 'Obrigado pelo feedback!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Erro ao avaliar curso:', error);
      throw new Error('Não foi possível concluir a avaliação.');
    }
  }

  async editarCurso(
    cursoUpadateDto: CursoUpadateDTO,
    id: number,
  ): Promise<{ message: String }> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cursoeditar = await queryRunner.manager.findOne(Curso, {
        where: {
          id_curso: id,
        },
      });

      if (!cursoeditar) {
        throw new BadRequestException(`Curso com id ${id} não encontrado.`);
      }

      Object.assign(cursoeditar, cursoUpadateDto);

      await queryRunner.manager.save(Curso, cursoeditar);
      await queryRunner.commitTransaction();
      return { message: 'Curso editado com sucesso!' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('Erro ao editar o curso: ', error);
      throw new BadRequestException('Não foi possível editar o curso!');
    } finally {
      await queryRunner.release();
    }
  }

  async deletarCurso(id: number): Promise<{ message: String }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cursoDeletar = await queryRunner.manager.findOne(Curso, {
        where: {
          id_curso: id,
        },
      });
      await queryRunner.manager.delete(Curso, { id_curso: id });

      if (!cursoDeletar) {
        throw new BadRequestException(`Curso com id ${id} não encontrado.`);
      }

      await queryRunner.commitTransaction();
      return {
        message: 'O curso foi delatado, junto com suas inscrições e modulos.',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('Erro ao deletar o curso:', error);
      throw new BadRequestException('Não foi possível deletar o curso!');
    } finally {
      await queryRunner.release();
    }
  }
}
