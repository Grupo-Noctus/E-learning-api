import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoModule } from 'src/curso/curso.module';
import { Modulo } from './entities/modulo.entity';
import { ModuloController } from './modulo.controller';
import { ModuloService } from './modulo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Modulo]), 
  forwardRef(() =>CursoModule,) 
],
  controllers: [ModuloController],
  providers: [ModuloService],
  exports: [ModuloService],
})
export class ModuloModule {}