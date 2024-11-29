import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Papel } from "./papelEnum";
import { Aluno } from "./aluno.entity";
import { Instrutor } from "./instrutor.entity";

@Entity('usuarios')
export class Usuario{
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @Column({ type: 'enum', enum: Papel })
    papel: Papel;

    @Column({ nullable: true })
    foto_perfil?: string;

    @CreateDateColumn()
    data_criacao: Date;

    @OneToOne(() => Aluno, (aluno) => aluno.matricula, { nullable: true, eager: true })
    @JoinColumn()
    aluno?: Aluno;

    @OneToOne(() => Instrutor, (Instrutor) => Instrutor.id_instrutor, { nullable: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    instrutor?: Instrutor;
}