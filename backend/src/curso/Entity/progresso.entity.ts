import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./statusEnum";
import { Modulo } from "./modulo.entity";
import { Aluno } from "src/usuario/Entity/aluno.entity";

@Entity('progressos_modulos')
export class Progresso {
    @PrimaryGeneratedColumn()
    id_progresso: number;

    @ManyToOne(() => Aluno, (aluno) => aluno.progessos)
    @JoinColumn()
    aluno: Aluno;  

    @ManyToOne(() => Modulo, (modulo) => modulo.progessos)
    @JoinColumn()
    modulo: Modulo;  

    @Column({ type: 'enum', enum: Status })
    status: string;  

    @CreateDateColumn()
    data_conclusao: Date;  
}