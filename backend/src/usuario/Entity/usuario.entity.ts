import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Papel } from "./papelEnum";
import { Aluno } from "./aluno.entity";
import { Instrutor } from "./instrutor.entity";

@Entity('usuarios')
export class Usuario{
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nome: String;

    @Column()
    email: String;

    @Column()
    senha: String;

    @Column({ type: 'enum', enum: Papel })
    papel: Papel;

    @Column()
    foto_perfil: String;

    @CreateDateColumn()
    data_criacao: Date;

    @OneToOne(() => Aluno, (aluno) => aluno.matricula, { cascade: true, nullable: true })
    @JoinColumn()
    aluno?: Aluno;

    @OneToOne(() => Instrutor, (Instrutor) => Instrutor.id_instrutor, { cascade: true, nullable: true })
    @JoinColumn()
    instrutor?: Instrutor;
}