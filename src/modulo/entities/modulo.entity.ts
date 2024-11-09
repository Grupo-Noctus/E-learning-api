import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "src/curso/entities/curso.entity";

@Entity()
export class Modulo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    ordem: number;

    @ManyToOne(() => Curso, (curso) => curso.modulos, { eager: true, cascade: true }) 
    curso: Curso; 
}