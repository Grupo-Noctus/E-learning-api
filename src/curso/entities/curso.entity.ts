import { CreateModuloDto } from "src/modulo/dto/create-modulo.dto";
import { Modulo } from "src/modulo/entities/modulo.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Modulo, (modulo) => modulo.curso) 
    modulos: CreateModuloDto[];

    @ManyToMany(() => User, (user) => user.cursos)
    @JoinTable() 
    users: User[];
}