import { Injectable, Body } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>
  ){}

  async createCurso(@Body() cursoDTO: CreateCursoDto) {
    const curso = new Curso();
    await this.cursoRepository.save(curso); 
    return curso;
  }

  async update(id: number, updateCurso: UpdateCursoDto): Promise<Curso> {
    const curso = await this.findOne(id);

    Object.assign(curso, updateCurso);
    return this.cursoRepository.save(curso);
  }

  async remove(id: number) {
    const curso = await this.findOne(id);

    return this.cursoRepository.remove(curso);
  }
  
  findAll(): Promise<Curso[]> {
    return this.cursoRepository.find();
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if(!curso){
      throw new NotFoundException("Usuário não encontrado.");
    }
    return curso;
  }
}
