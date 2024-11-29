import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Curso } from "src/curso/Entity/curso.entity";

@Entity('professores')
export class Instrutor {
    @PrimaryGeneratedColumn()
    id_instrutor: number;

    @OneToOne(() => Usuario, (usuario) => usuario.instrutor, { onDelete: 'CASCADE' })
    usuario: Usuario;

    @OneToMany(() => Curso, (curso) => curso.instrutor, { nullable: true })
    cursos?: Curso[]; 
}