import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';
import { Role } from '../dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  senha: string;

  @Column({ type: 'enum', enum: Role})
  role: Role;

  @Column({ nullable: true })
  foto_perfil: string;

  @OneToMany(() => Curso, curso => curso.users, { eager: true, cascade: true }) // Corrigido para referenciar a propriedade correta
    cursos: Curso[];
}
