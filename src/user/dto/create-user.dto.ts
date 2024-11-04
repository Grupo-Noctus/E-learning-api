import { Curso } from "src/curso/entities/curso.entity";

export class CreateUserDto {
    nome: string
    email: string;
    senha: string;
    role: 'aluno' | 'prof' | 'adm';
    foto_perfil: string;
    //validar como opcinal
    cursos: Curso[];
}