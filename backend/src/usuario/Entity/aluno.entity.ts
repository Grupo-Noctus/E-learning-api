import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Inscricao } from "src/curso/Entity/inscricao.entity";

@Entity('estudantes')
export class Aluno{
    @PrimaryGeneratedColumn()
    matricula: number;

    @OneToOne(() => Usuario, (usuario) => usuario.aluno, {onDelete: 'CASCADE'})
    usuario: Usuario;

    @OneToMany(() => Inscricao, (inscricao) => inscricao.curso, { nullable: true })
    inscricoes?: Inscricao[];
}