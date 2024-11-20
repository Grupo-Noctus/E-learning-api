import { Curso } from "src/curso/Entity/curso.entity";
import { IsOptional } from "class-validator";

export class AlunoCreateDTO {
    @IsOptional()
    cursos: Curso[];
}