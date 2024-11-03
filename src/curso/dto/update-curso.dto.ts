import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    titulo: string;
    descricao: string;
    imagem: string;
    modulos: string;
}
