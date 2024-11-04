import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { CursoService } from 'src/curso/curso.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Curso])],
  controllers: [UserController],
  providers: [UserService, CursoService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
