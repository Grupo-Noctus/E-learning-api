import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';
import { CreateModuloDto } from './create-modulo';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    titulo: string;
    descricao: string;
    imagem: string;
    modulos?: CreateModuloDto[];
}
