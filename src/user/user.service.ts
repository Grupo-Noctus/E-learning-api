import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CursoService } from 'src/curso/curso.service';
import { Role } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cursoService: CursoService
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.nome = createUserDto.nome;
    user.email = createUserDto.email;
    user.senha = createUserDto.senha;
    user.foto_perfil = createUserDto.foto_perfil;
    if(user.role === Role.ALUNO || user.role === Role.INSTRUTOR){
      user.cursos = await createUserDto.cursos;
    }else{
      user.cursos = await this.cursoService.findAll();
    }
    if(!user){
      throw new NotFoundException("Existe algum campo inválido!");
    }
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new NotFoundException("Nenhum usuário cadastrado!");
    }
    return (users);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`O usuário de id: {id}, não exite`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); 
    Object.assign(user, updateUserDto);  
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async findOneEmail(email:string): Promise<User>{
    return await this.userRepository.findOne({where:{email}});
  }
}