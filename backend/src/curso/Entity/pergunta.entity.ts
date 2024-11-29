import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Atividade } from "./atividade.entity";

@Entity('perguntas_modulos')
export class Pergunta {
    @PrimaryGeneratedColumn()
    id_pergunta: number;

    @ManyToOne(() => Atividade, (atividade) => atividade.perguntas, { onDelete: 'CASCADE' })
    atividade: Atividade;

    @Column()
    enunciado: string;

    @Column({ type: 'enum', enum: ['objetiva', 'verdadeiro-falso'] })
    tipo: 'objetiva' | 'verdadeiro-falso';

    @Column({ type: 'text', nullable: true })
    opcao1?: string; 

    @Column({ type: 'text', nullable: true })
    opcao2?: string;  

    @Column({ type: 'text', nullable: true })
    opcao3?: string; 

    @Column({ type: 'text', nullable: true })
    opcao4?: string;  
    
    @Column()
    respostaCorreta: string;
}