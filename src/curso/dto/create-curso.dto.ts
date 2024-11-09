import { Modulo } from "src/modulo/entities/modulo.entity";
import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreateCursoDto {
    @IsNotEmpty({ message: 'Qual é o nome do curso?' })
    @IsString()
    titulo: string;

    @IsString({ message: 'Coloque uma descrição!' })
    descricao: string;

    @IsOptional()
    imagem: string;

    modulos: Modulo[];
}