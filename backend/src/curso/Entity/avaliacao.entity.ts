import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inscricao } from "./inscricao.entity";

@Entity('feedbacks')
export class Avaliacao {
    @PrimaryGeneratedColumn()
    id_avalicao: number;

    @OneToOne (() => Inscricao, {eager: true})
    @JoinColumn()
    inscricao: Inscricao;

    @Column()
    nota: number;

    @Column({ type: 'text', nullable: true })
    comentário?: string;

    @CreateDateColumn()
    dara_avaliacao: Date;
}