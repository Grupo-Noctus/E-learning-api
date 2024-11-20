import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './Entity/usuario.entity';
import { Instrutor } from './Entity/instrutor.entity';
import { Aluno } from './Entity/aluno.entity';
import { InstrutorService } from './instrutor.service';
import { AlunoService } from './aluno.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario, Instrutor, Aluno]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, AlunoService, InstrutorService],
  exports: [AlunoService, InstrutorService],
})
export class UsuarioModule {}
