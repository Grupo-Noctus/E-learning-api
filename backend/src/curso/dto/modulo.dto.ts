import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class ModuloDTO {
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  titulo: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  descricao: string;

  @IsInt({ message: 'A ordem deve ser um número inteiro.' })
  @Min(1, { message: 'A ordem deve ser no mínimo 1.' })
  @Max(20, { message: 'A ordem pode ser no máximo 20.' })
  ordem: number;

  @IsInt({ message: 'O ID do curso deve ser um número inteiro.' })
  id_curso: number;
}
