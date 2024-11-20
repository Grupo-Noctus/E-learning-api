import { IsOptional} from "class-validator";
import { Curso } from "src/curso/Entity/curso.entity";

export class InstrutorCreateDTO {
    @IsOptional()
    cursos: Curso[];
}