import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CursoDTO {
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @IsString({ message: 'O título deve ser uma string.' })
  titulo: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao: string;

  @IsOptional()
  @IsString({ message: 'A imagem deve ser um caminho válido (string).' })
  imagem: string;

  @IsNotEmpty({ message: 'O ID do instrutor é obrigatório.' }) 
  id_instrutor: number;
}
