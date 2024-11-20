import { IsInstance, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Instrutor } from "src/usuario/Entity/instrutor.entity";

export class CursoDTO {
    @IsNotEmpty()
    @IsString()
    titulo: String;

    @IsNotEmpty()
    @IsString()
    descricao: String;

    @IsOptional() 
    @IsInstance(File, { message: 'Imagem deve ser um arquivo válido.' })
    imagem: String;

    id_instrutor: number;
}