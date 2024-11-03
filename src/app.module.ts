import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoModule } from './curso/curso.module';
import { Curso } from './curso/entities/curso.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "noctus",
      password: "noctus",
      database: "e-learning",
      entities: [Curso],
      synchronize: true
    }),
    CursoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
