import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './Entity/aluno.entity';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async findAlunoById(matricula: number): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne({
      where: { matricula },
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno com matricula: ${matricula} não encontrado.`);
    }

    return aluno;
  }
}
