import { Curso } from "src/curso/Entity/curso.entity";
import { IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AlunoCreateDTO {
  @IsOptional() 
  @IsArray() 
  @ValidateNested({ each: true })
  @Type(() => Curso)
  cursos: Curso[];
}