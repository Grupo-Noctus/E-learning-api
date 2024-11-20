import { IsInt, IsNotEmpty, IsString, Max, Min, Validate } from "class-validator";
import { Modulo } from "../Entity/modulo.entity";

export class ModuloDTO {
    @IsString()
    @IsNotEmpty()
    titulo: String;

    @IsString()
    @IsNotEmpty()
    descricao: String;

    @IsInt()
    @Min(1)
    @Max(20)
    ordem: number;

    @IsInt()
    id_curso: number;
}