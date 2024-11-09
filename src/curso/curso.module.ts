import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import { Curso } from './entities/curso.entity';
import { ModuloService } from 'src/modulo/modulo.service';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import { ModuloModule } from 'src/modulo/modulo.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Curso]), 
      forwardRef(() =>ModuloModule,)
    ],
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService], 
})
export class CursoModule {}
