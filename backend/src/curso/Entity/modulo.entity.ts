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

    @ManyToOne(() => Curso, (curso) => curso.modulos, { onDelete: 'CASCADE' })
    curso: Curso;

    @OneToMany(() => Progresso, (progresso) => progresso.modulo, { nullable: true})
    progessos?: Progresso[];

    @OneToOne(() => Atividade, (atividade) => atividade.modulo, { nullable: true})
    atividade?: Atividade;

    @OneToMany(() => Pontuacao, (pontuacao) => pontuacao.modulo, { nullable: true})
    pontuacoes?: Pontuacao[];

}