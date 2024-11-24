import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./curso.entity";
import { Progresso } from "./progresso.entity";
import { Atividade } from "./atividade.entity";
import { Pontuacao } from "./pontuacao.entity";

@Entity('modulos_cursos')
export class Modulo {
    @PrimaryGeneratedColumn()
    id_modulo: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    ordem: number;

    @ManyToOne(() => Curso, (curso) => curso.modulos, { eager: true, onDelete: 'CASCADE' })
    curso: Curso;

    @OneToMany(() => Progresso, (progresso) => progresso.modulo)
    progessos?: Progresso[];

    @OneToOne(() => Atividade, (atividade) => atividade.modulo, { nullable: true })
    atividade?: Atividade;

    @OneToMany(() => Pontuacao, (pontuacao) => pontuacao.modulo)
    pontuacoes?: Pontuacao[];

}