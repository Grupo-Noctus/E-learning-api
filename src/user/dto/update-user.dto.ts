import { IsEmail, IsEnum, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { Curso } from "src/curso/entities/curso.entity";
import { Role } from "./create-user.dto";

export class UpdateUserDto {
    @IsString({ message:'Não insira números em seu nome.' })
    nome: string

    @IsEmail({}, { message:'Coloque um email valido!' })
    email: string;

    @MinLength(6, { message: 'A senha deve possuir ao menos 6 caracteres!' })
    senha: string;

    @IsEnum(Role)
    role: Role;

    @IsOptional()
    foto_perfil: string;

    @ValidateNested({ each: true })
    cursos: Curso[];
}