import { IsInt, IsString, Max, Min, IsOptional } from "class-validator";

export class AvaliacaoDTO {
  @IsInt()
  @Min(0, { message: 'A nota deve ser no mínimo 0.' })
  @Max(5, { message: 'A nota não pode ser superior a 5.' })
  nota: number;

  @IsOptional()
  @IsString({ message: 'O comentário deve ser uma string.' })
  comentario: string;

  @IsInt()
  id_inscricao: number;
}
