import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './Entity/curso.entity';
import { InscricaoService } from 'src/curso/inscricao.service';
import { InscricaoController } from 'src/curso/inscricao.controller';
import { Inscricao } from './Entity/inscricao.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ModuloService } from './modulo.service';
import { Modulo } from './Entity/modulo.entity';
import { ModuloController } from './modulo.controller';
import { Avaliacao } from './Entity/avaliacao.entity';
import { Progresso } from './Entity/progresso.entity';

@Module({
  imports:[
    UsuarioModule,
    TypeOrmModule.forFeature([Curso, Inscricao, Modulo, Avaliacao, Progresso])
  ],
  controllers: [CursoController, InscricaoController, ModuloController],
  providers: [InscricaoService, CursoService, ModuloService]
})
export class CursoModule {}
