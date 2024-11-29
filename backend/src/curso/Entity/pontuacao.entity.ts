import { Aluno } from "src/usuario/Entity/aluno.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Modulo } from "./modulo.entity";

@Entity('pontuacoes_atividades')
export class Pontuacao {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Aluno, (aluno) => aluno.pontuacoes, { eager: true })
    // aluno: Aluno;

    @ManyToOne(() => Modulo, (modulo) => modulo.pontuacoes, { eager: true, onDelete: 'CASCADE' })
    modulo: Modulo;

    @Column({ type: 'int' })
    pontuacao: number;

    @CreateDateColumn()
    data_registro: Date;
}