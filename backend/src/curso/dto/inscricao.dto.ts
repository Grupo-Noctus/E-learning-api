import { IsEnum, IsInt, IsOptional } from "class-validator";
import { Status } from "../Entity/statusEnum";

export class InscricaoDTO {
    @IsOptional()
    @IsEnum(Status)
    status: Status;

    @IsInt()
    id_aluno: number;

    @IsInt()
    id_curso: number;
}