import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Curso } from 'src/curso/entities/curso.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    nome: string
    email: string;
    senha: string;
    foto_perfil: string;
    //validar como opcinal
    cursos: Curso[];
}
