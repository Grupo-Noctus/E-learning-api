import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoService } from 'src/curso/curso.service';
import { Curso } from 'src/curso/entities/curso.entity';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import { ModuloService } from 'src/modulo/modulo.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CursoModule } from 'src/curso/curso.module';
import { ModuloModule } from 'src/modulo/modulo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), forwardRef(() => CursoModule), forwardRef(() => ModuloModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], 
})
export class UserModule {}
