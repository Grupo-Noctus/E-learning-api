import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Curso {
    @PrimaryGeneratedColumn()
    id_curso: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    imagem: string;

    @Column()
    modulos: string;
}
