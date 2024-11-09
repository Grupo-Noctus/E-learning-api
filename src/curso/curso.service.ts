import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuloService } from 'src/modulo/modulo.service';
import { Repository } from 'typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    private readonly moduloService: ModuloService
  ) { }

  async createCurso(cursoDTO: CreateCursoDto): Promise<Curso> {
    const curso = new Curso();
    curso.titulo = cursoDTO.titulo;
    curso.descricao = cursoDTO.descricao;
    curso.imagem = cursoDTO.imagem;

    const savedCurso = await this.cursoRepository.save(curso);

    const modulos = await Promise.all(
      cursoDTO.modulos.map(async (moduloDTO) => {
        const modulo = await this.moduloService.createModulo(moduloDTO);
        if (!curso) {
          throw new NotFoundException("Não foi possivel cadastrar o curso.");
        }
        modulo.curso = savedCurso; 
        return modulo;
      })
    );

    savedCurso.modulos = modulos;

    return savedCurso;
  }

  async update(id: number, updateCurso: UpdateCursoDto): Promise<Curso> {
    const curso = await this.findOne(id);
    Object.assign(curso, updateCurso);
    return this.cursoRepository.save(curso);
  }

  async remove(id: number): Promise<Curso> {
    const curso = await this.findOne(id);
    return this.cursoRepository.remove(curso);
  }

  async findAll(): Promise<Curso[]> {
    return await this.cursoRepository.find();
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if (!curso) {
      throw new NotFoundException("Curso não encontrado.");
    }
    return curso;
  }
}
