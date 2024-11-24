import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./statusEnum";
import { Modulo } from "./modulo.entity";
import { Inscricao } from "./inscricao.entity";

@Entity('progressos_modulos')
export class Progresso {
    @PrimaryGeneratedColumn()
    id_progresso: number;

    @ManyToOne(() => Inscricao, (inscricao) => inscricao.progresso, { eager: true })
    @JoinColumn()
    inscricao: Inscricao; 

    @ManyToOne(() => Modulo, (modulo) => modulo.progessos)
    @JoinColumn()
    modulo: Modulo; 

    @CreateDateColumn()
    data_conclusao: Date;  
}
