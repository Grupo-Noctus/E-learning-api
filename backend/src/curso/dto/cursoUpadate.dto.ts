import { PartialType } from "@nestjs/mapped-types";
import { CursoDTO } from "./curso.dto";

export class CursoUpadateDTO extends PartialType(CursoDTO){}