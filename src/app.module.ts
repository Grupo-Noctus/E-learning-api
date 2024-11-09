import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/authUsers/role.guard';
import { CursoModule } from './curso/curso.module';
import { Curso } from './curso/entities/curso.entity';
import { Modulo } from './modulo/entities/modulo.entity';
import { ModuloModule } from './modulo/modulo.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';


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
      synchronize: true, 
    }),
    CursoModule,
    UserModule,
    AuthModule,
    ModuloModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, 
    },
  ],
})
export class AppModule {}
