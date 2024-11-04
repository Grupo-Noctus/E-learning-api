import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { Modulo } from "./modulo.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Curso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    imagem: string;

    @OneToMany(() => Modulo, (modulo) => modulo.curso, { eager: true, cascade: true }) 
    modulos: Modulo[];

    @ManyToOne(()=> User, (prof)=> prof.cursos_ministrados, { eager: true, cascade: true })
    prof: User;

    @ManyToMany(()=> User, (aluno)=> aluno.cursos, { eager: true, cascade: true })
    aluno: User;

    @ManyToMany(()=> User, (adm)=> adm.cursos_ministrados, { eager: true, cascade: true })
    adm: User;
}