import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoModule } from './curso/curso.module';
import { Curso } from './curso/entities/curso.entity';
import { Modulo } from './curso/entities/modulo.entity';
import { CursoController } from './curso/curso.controller';
import { CursoService } from './curso/curso.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "noctus",
      password: "noctus",
      database: "e-learning",
      entities: [Curso, Modulo, User],
      synchronize: true
    }),
    CursoModule,
    UserModule
  ],
  controllers: [AppController, CursoController, UserController],
  providers: [AppService, CursoService, UserService],
})
export class AppModule {}
