import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inscricao } from "./inscricao.entity";

@Entity('certificados_inscricoes')
export class Certificado {
    @PrimaryGeneratedColumn()
    id_certificado: number;

    @ManyToOne(() => Inscricao, (inscricao) => inscricao.certificado, { onDelete: 'CASCADE' })
    @JoinColumn()
    inscricao: Inscricao;

    @CreateDateColumn()
    data_emissao: Date; 
}