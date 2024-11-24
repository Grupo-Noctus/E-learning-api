import { IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Curso } from "src/curso/Entity/curso.entity";

export class InstrutorDTO {
  @IsOptional() 
  @IsArray() 
  @ValidateNested({ each: true })
  @Type(() => Curso) 
  cursos: Curso[];
}
