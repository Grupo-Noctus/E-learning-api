import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { NotFoundException } from '@nestjs/common';
import { Modulo } from './entities/modulo.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>
  ) {}

  async createCurso(cursoDTO: CreateCursoDto) { 
    const curso = new Curso();
    curso.titulo = cursoDTO.titulo;
    curso.descricao = cursoDTO.descricao;
    curso.imagem = cursoDTO.imagem;

    if (cursoDTO.modulos) {
      curso.modulos = cursoDTO.modulos.map(moduloDTO => {
        const modulo = new Modulo();
        modulo.titulo = moduloDTO.titulo;
        modulo.descricao = moduloDTO.descricao;
        modulo.ordem = moduloDTO.ordem;
        return modulo;
      });
    }
    return this.cursoRepository.save(curso); 
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
    if (!curso) {
      throw new NotFoundException("Curso não encontrado.");
    }
    return curso;
  }
}
