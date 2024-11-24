import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inscricao } from "./inscricao.entity";
import { Instrutor } from "src/usuario/Entity/instrutor.entity";
import { Modulo } from "./modulo.entity";

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn()
    id_curso: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    imagem: string;

    @OneToMany(() => Modulo, (modulo) => modulo.curso, { cascade: true, onDelete: 'CASCADE' })
    modulos: Modulo[];

    @OneToMany(() => Inscricao, (inscricao) => inscricao.curso, { cascade: true, onDelete: 'CASCADE' })
    inscricoes: Inscricao[];

    @ManyToOne(() => Instrutor, (instrutor) => instrutor.cursos)
    @JoinColumn()
    instrutor: Instrutor;
}
