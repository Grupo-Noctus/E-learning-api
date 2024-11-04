import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./curso.entity";

@Entity()
export class Modulo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string

    @Column()
    descricao: string;

    @Column()
    ordem: number;

    @ManyToOne(() => Curso, (curso) => curso.modulos) 
    curso: Curso;
}