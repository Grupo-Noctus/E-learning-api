import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CursoService } from 'src/curso/curso.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cursoService: CursoService
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.nome = createUserDto.nome;
    user.email = createUserDto.email;
    user.senha = createUserDto.senha;
    user.role = createUserDto.role;
    user.foto_perfil = createUserDto.foto_perfil;
    if(user.role === 'aluno'){
      user.cursos = await createUserDto.cursos;
    }else if(user.role === 'prof'){
      user.cursos_ministrados = await createUserDto.cursos;
    }else{
      user.cursos = await this.cursoService.findAll();
    }

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return (users);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}