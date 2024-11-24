import { IsInt, Max, Min } from "class-validator";

export class PontuacaoDto{
    @IsInt()
    @Min(0)
    @Max(10)
    pontuacao: number;
}