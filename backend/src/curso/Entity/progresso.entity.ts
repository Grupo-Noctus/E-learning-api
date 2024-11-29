import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Modulo } from "./modulo.entity";
import { Inscricao } from "./inscricao.entity";

@Entity('progressos_modulos')
export class Progresso {
    @PrimaryGeneratedColumn()
    id_progresso: number;

    @ManyToOne(() => Inscricao, (inscricao) => inscricao.progresso, { onDelete: 'CASCADE' })
    @JoinColumn()
    inscricao: Inscricao; 

    @ManyToOne(() => Modulo, (modulo) => modulo.progessos, { onDelete: 'CASCADE' })
    @JoinColumn()
    modulo: Modulo; 

    @CreateDateColumn()
    data_conclusao: Date;  
}
