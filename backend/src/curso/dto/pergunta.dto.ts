import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PerguntaDTO {
    @IsString()
    @IsNotEmpty()
    enunciado: String;

    @IsString()
    @IsNotEmpty()
    opcao1: String;

    @IsString()
    @IsNotEmpty()
    opcao2: String;

    @IsString()
    @IsOptional()
    opcao3: String;

    @IsString()
    @IsOptional()
    opcao4: String;

    @IsString()
    @IsNotEmpty()
    @IsIn(['opcao1', 'opcao2', 'opcao3', 'opcao4'])
    respostaCorreta: String;
}