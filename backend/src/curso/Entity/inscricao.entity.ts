import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./curso.entity";
import { Aluno } from "src/usuario/Entity/aluno.entity";
import { Status } from "./statusEnum";
import { Certificado } from "./certificado.entity";
import { Progresso } from "./progresso.entity";

@Entity('inscricoes_cursos')
export class Inscricao {
    @PrimaryGeneratedColumn()
    id_inscricao: number;

    @ManyToOne(() => Aluno, (aluno) => aluno.inscricoes, { onDelete: 'CASCADE' })
    @JoinColumn()
    aluno: Aluno;

    @ManyToOne(() => Curso, (curso) => curso.inscricoes, { onDelete: 'CASCADE' })
    @JoinColumn()
    curso: Curso; 

    @CreateDateColumn()
    data_inscricao: Date;

    @Column({ type: 'enum', enum: Status, default: Status.EMANDAMENTO })
    status: Status;

    @OneToMany(() => Progresso, (progresso) => progresso.inscricao, { nullable: true })
    progresso?: Progresso[];

    @OneToOne(() => Certificado, (certificado) => certificado.inscricao, { nullable: true })
    certificado?: Certificado;
}
