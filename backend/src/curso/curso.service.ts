import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './Entity/curso.entity';
import { Repository } from 'typeorm';
import { CursoDTO } from './dto/curso.dto';
import { InstrutorService } from 'src/usuario/instrutor.service';
import { AvaliacaoDTO } from './dto/avaliacao.dto';
import { InscricaoService } from './inscricao.service';
import { Avaliacao } from './Entity/avaliacao.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
      private readonly curso: Repository<Curso>,
      @InjectRepository(Avaliacao)
      private readonly avaliacao: Repository<Avaliacao>,
      private readonly instrutorService: InstrutorService,
      private readonly inscricaoService: InscricaoService
  ){}

  async criarCurso(cursoDto: CursoDTO): Promise<{ message: String }>{
    const curso = new Curso;

    try{
      curso.titulo = cursoDto.titulo;
      curso.descricao = cursoDto.descricao;
      curso.imagem = cursoDto.imagem;
      curso.instrutor = await this.instrutorService.findInstrutorById(cursoDto.id_instrutor)

      await this.curso.save(curso)
      return { message: "Curso cadastrado com sucesso!"}
    }catch(error){
      console.error(error);
      throw new Error('Não foi possível cadastrar o curso.');
    }
  }

  async buscarCurso(id_curso: number): Promise<Curso> {
    const aluno = await this.curso.findOne({
      where: { id_curso },
    });
    if (!aluno) {
      throw new NotFoundException(`Curso com id: ${id_curso} não encontrado.`);
    }
    return aluno;
  }

    async avaliarCurso(avaliacaoDto: AvaliacaoDTO): Promise<{message: String}>{
      const avaliacao = new Avaliacao();
      if(!await this.inscricaoService.buscarIncrição(avaliacaoDto.id_inscricao)){
        return{ message: `Inscrição com id: ${avaliacaoDto.id_inscricao} não encontrado.`};
      }
      const inscricao = await this.inscricaoService.buscarIncrição(avaliacaoDto.id_inscricao)

      avaliacao.inscricao = inscricao;
      avaliacao.nota = avaliacaoDto.nota;
      avaliacao.comentário = avaliacaoDto.comentario;

      await this.avaliacao.save(avaliacao)
      return {message: "Seu feedback foi adicionado ao curso."}
  }
}
