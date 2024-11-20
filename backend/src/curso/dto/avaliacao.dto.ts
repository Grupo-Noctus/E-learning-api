import { IsInt, IsString, Max, Min } from "class-validator";

export class AvaliacaoDTO {
    @IsInt()
    @Min(0)
    @Max(5)
    nota: number;

    @IsString()
    comentario: String;

    @IsInt()
    id_inscricao: number;
}