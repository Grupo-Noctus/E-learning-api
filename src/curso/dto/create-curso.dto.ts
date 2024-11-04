import { CreateModuloDto } from "./create-modulo";
export class CreateCursoDto {
    titulo: string;
    descricao: string;
    imagem: string;
    modulos: CreateModuloDto[];
}
