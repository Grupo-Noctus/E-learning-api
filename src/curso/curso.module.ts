import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Modulo } from './entities/modulo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Modulo])],
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService, TypeOrmModule],
})
export class CursoModule {}
