import { IsEmail, IsEnum, IsInstance, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Papel } from "../Entity/papelEnum";

export class UsuarioCreateDTO {
    @IsString()
    @IsNotEmpty()
    nome: String;

    @IsEmail()
    @IsNotEmpty()
    email: String;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: "A senha deve conter pelo menos 6 caracteres." })
    senha: String;

    @IsEnum(Papel, { message: "O usuário pode ser: ADMIN, INSTRUTOR ou ALUNO." })
    papel: Papel;

    @IsOptional() 
    @IsInstance(File, { message: 'Imagem deve ser um arquivo válido.' })
    foto_perfil: String;
}