export class CreateCursoDto {
    titulo: string;
    descricao: string;
    imagem: string;
    modulos: string[];

    constructor(titulo: string, descricao: string, imagem: string, modulos: string[]) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.imagem = imagem;
        this.modulos = modulos;
    }
}
