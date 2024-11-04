import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';

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

  @Column({ type: 'enum', enum: ['aluno', 'prof', 'adm'], default: 'aluno' })
  role: 'aluno' | 'prof' | 'adm';

  @Column({ nullable: true })
  foto_perfil: string;

  @OneToMany(() => Curso, curso => curso.prof)
  cursos_ministrados: Curso[];

  @ManyToMany(() => Curso, curso => curso.aluno)
  @JoinTable()
  cursos: Curso[];
}
