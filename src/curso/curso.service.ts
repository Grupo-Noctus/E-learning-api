import { Injectable, Body } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Curso} from './entities/curso.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>
  ){}

  async createCurso(@Body() cursoDTO: CreateCursoDto) {
    const curso = new Curso();
    curso.titulo = cursoDTO.titulo;
    curso.descricao = cursoDTO.descricao;
    curso.imagem = cursoDTO.imagem;
    curso.modulos = cursoDTO.modulos;

    await this.cursoRepository.save(curso); 
    return curso;
}

  findAll() {
    return `This action returns all curso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} curso`;
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return `This action updates a #${id} curso`;
  }

  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
