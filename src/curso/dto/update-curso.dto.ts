import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';
import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    @IsEmpty({ message: 'Coloque o nome do Curso'})
    @IsString()
    titulo: string;

    @IsString()
    descricao: string;

    @IsOptional()
    imagem: string;
}