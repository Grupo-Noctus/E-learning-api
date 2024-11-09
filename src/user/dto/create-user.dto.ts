import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { Curso } from "src/curso/entities/curso.entity";

export enum Role{
    ALUNO = 'ALUNO',
    INSTRUTOR = 'INSTRUTOR',
    ADMIN = 'ADMIN'
}

export class CreateUserDto {
    @IsNotEmpty({ message: 'Coloque seu nome!' })
    @IsString({ message:'Não insira números em seu nome.' })
    nome: string

    @IsNotEmpty({ message: 'Coloque seu email!' })
    @IsEmail({}, { message:'Coloque um email valido!' })
    email: string;

    @IsNotEmpty({ message:'Você precisa de  uma senha!' })
    @MinLength(6, { message: 'A senha deve possuir ao menos 6 caracteres!' })
    senha: string;

    @IsEnum(Role)
    role: Role;

    @IsOptional()
    foto_perfil: string;

    @IsOptional()
    @ValidateNested({ each: true })
    cursos: Curso[];
}