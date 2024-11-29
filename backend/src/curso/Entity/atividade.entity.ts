import { Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Modulo } from "./modulo.entity";
import { Pergunta } from "./pergunta.entity";

@Entity('atividades_modulos')
export class Atividade {
    @PrimaryGeneratedColumn()
    id_atividade: number;

    @OneToOne(() => Modulo, (modulo) => modulo.atividade, { onDelete: 'CASCADE' })
    @JoinTable()
    modulo: Modulo;

    @OneToOne(() => Pergunta, (pergunta) => pergunta.atividade)
    perguntas: Pergunta[];
}