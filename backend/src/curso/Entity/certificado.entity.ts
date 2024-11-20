import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inscricao } from "./inscricao.entity";

@Entity('certificados')
export class Certificado {
    @PrimaryGeneratedColumn()
    id_certificado: number;

    @ManyToOne(() => Inscricao, (inscricao) => inscricao.certificado)
    @JoinColumn()
    inscricao: Inscricao;

    @CreateDateColumn()
    data_emissao: Date; 
}