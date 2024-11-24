import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./curso.entity";
import { Aluno } from "src/usuario/Entity/aluno.entity";
import { Status } from "./statusEnum";
import { Certificado } from "./certificado.entity";
import { Progresso } from "./progresso.entity";

@Entity('inscricoes_curso')
@Entity('inscricoes_curso')
export class Inscricao {
    @PrimaryGeneratedColumn()
    id_inscricao: number;

    @ManyToOne(() => Aluno, (aluno) => aluno.inscricoes)
    @JoinColumn()
    aluno: Aluno;

    @ManyToOne(() => Curso, (curso) => curso.inscricoes, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    curso: Curso; 

    @CreateDateColumn()
    data_inscricao: Date;

    @Column({ type: 'enum', enum: Status, default: Status.EMANDAMENTO })
    status: Status;

    @OneToMany(() => Progresso, (progresso) => progresso.inscricao)
    progresso: Progresso[];

    @OneToOne(() => Certificado, (certificado) => certificado.inscricao)
    certificado?: Certificado;
}
