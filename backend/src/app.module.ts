import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { CursoModule } from './curso/curso.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './curso/Entity/curso.entity';
import { Usuario } from './usuario/Entity/usuario.entity';
import { Instrutor } from './usuario/Entity/instrutor.entity';
import { Aluno } from './usuario/Entity/aluno.entity';
import { Inscricao } from './curso/Entity/inscricao.entity';
import { Certificado } from './curso/Entity/certificado.entity';
import { Avaliacao } from './curso/Entity/avaliacao.entity';
import { Atividade } from './curso/Entity/atividade.entity';
import { Modulo } from './curso/Entity/modulo.entity';
import { Pergunta } from './curso/Entity/pergunta.entity';
import { Pontuacao } from './curso/Entity/pontuacao.entity';
import { Progresso } from './curso/Entity/progresso.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "noctus",
      password: "noctus",
      database: "e-learning",
      entities: [
        Usuario, 
        Instrutor, 
        Aluno, 
        Curso, 
        Inscricao, 
        Certificado, 
        Avaliacao, 
        Atividade, 
        Modulo, 
        Pergunta, 
        Pontuacao, 
        Progresso
      ],
      synchronize: true, 
    }),
    UsuarioModule, 
    CursoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
