import { Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Inscricao } from "src/curso/Entity/inscricao.entity";
import { Progresso } from "src/curso/Entity/progresso.entity";
import { Pontuacao } from "src/curso/Entity/pontuacao.entity";

@Entity('estudantes')
export class Aluno{
    @PrimaryGeneratedColumn()
    matricula: number;

    @OneToOne(() => Usuario, (usuario) => usuario.aluno)
    usuario: Usuario;

    @OneToMany(() => Inscricao, (inscricao) => inscricao.curso)
    inscricoes?: Inscricao[];
    
    @OneToMany(() => Pontuacao, (pontuacao) => pontuacao.aluno)
    pontuacoes?: Pontuacao[];

}