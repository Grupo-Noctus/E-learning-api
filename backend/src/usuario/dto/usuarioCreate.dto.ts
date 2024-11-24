import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, IsEnum, IsOptional, IsInstance } from 'class-validator';
import { Papel } from '../Entity/papelEnum';

export class UsuarioDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome do usuário é obrigatório.' })
  nome: string;

  @IsEmail({}, { message: 'O email fornecido é inválido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres.' })
  @MaxLength(20, { message: 'A senha pode ter no máximo 20 caracteres.' })
  senha: string;

  @IsEnum(Papel, { message: 'O papel deve ser um dos seguintes: ADMIN, INSTRUTOR ou ALUNO.' })
  papel: Papel;

  @IsOptional()
  foto_perfil?: any;
}
