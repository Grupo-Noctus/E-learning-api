import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inscricao } from "./inscricao.entity";
import { Instrutor } from "src/usuario/Entity/instrutor.entity";
import { Modulo } from "./modulo.entity";

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn()
    id_curso: number;

    @Column()
    titulo: String;

    @Column()
    descricao: String;

    @Column()
    imagem: String;

    @OneToMany(() => Modulo, (modulo) => modulo.curso)
    modulos: Modulo[];

    @OneToMany(() => Inscricao, (inscricao) => inscricao.curso)
    inscricoes: Inscricao[];

    @ManyToOne(() => Instrutor, (instrutor) => instrutor.cursos)
    @JoinColumn()
    instrutor: Instrutor;
}
