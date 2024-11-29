import { PartialType } from "@nestjs/mapped-types";
import { UsuarioDTO } from "./usuarioCreate.dto";

export class UsuarioUpadateDTO extends PartialType(UsuarioDTO){}