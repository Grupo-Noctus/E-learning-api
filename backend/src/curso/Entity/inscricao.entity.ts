import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./curso.entity";
import { Aluno } from "src/usuario/Entity/aluno.entity";
import { Status } from "./statusEnum";
import { Certificado } from "./certificado.entity";

@Entity('inscricoes_curso')
export class Inscricao{
    @PrimaryGeneratedColumn()
    id_inscricao: number;

    @ManyToOne(() => Aluno, (aluno) => aluno.inscricoes)
    @JoinColumn()
    aluno: Aluno;

    @ManyToOne(() => Curso, (curso) => curso.inscricoes)
    @JoinColumn()
    curso: Curso;

    @CreateDateColumn()
    data_inscricao: Date;

    @Column({ type: 'enum', enum: Status })
    status: Status;

    @OneToOne(() => Certificado, (certificado) => certificado.inscricao)
    certificado?: Certificado; 
}