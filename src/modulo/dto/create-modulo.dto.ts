import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateModuloDto {
    @IsNotEmpty({ message: 'o campo titulo não pode ser vazio!'})
    titulo: string;

    @IsString({message: 'Adicione uma descrição'})
    descricao: string;

    @IsInt({ message: 'Insira a posição do modulo no curso!'})
    ordem: number;
}