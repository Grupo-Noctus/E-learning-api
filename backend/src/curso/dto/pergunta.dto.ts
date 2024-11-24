import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PerguntaDTO {
  @IsString({ message: 'O enunciado deve ser uma string.' })
  @IsNotEmpty({ message: 'O enunciado é obrigatório.' })
  enunciado: string;

  @IsString({ message: 'A opção 1 deve ser uma string.' })
  @IsNotEmpty({ message: 'A opção 1 é obrigatória.' })
  opcao1: string;

  @IsString({ message: 'A opção 2 deve ser uma string.' })
  @IsNotEmpty({ message: 'A opção 2 é obrigatória.' })
  opcao2: string;

  @IsString({ message: 'A opção 3 deve ser uma string.' })
  @IsOptional()
  opcao3: string;

  @IsString({ message: 'A opção 4 deve ser uma string.' })
  @IsOptional()
  opcao4: string;

  @IsString({ message: 'A resposta correta deve ser uma string.' })
  @IsNotEmpty({ message: 'A resposta correta é obrigatória.' })
  @IsIn(['opcao1', 'opcao2', 'opcao3', 'opcao4'], { message: 'A resposta correta deve ser uma das opções válidas: opcao1, opcao2, opcao3 ou opcao4.' })
  respostaCorreta: string;
}
