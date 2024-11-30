import { Module } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../Entity/usuario.entity';
import { UsuarioService } from '../usuario.service'; 
import { AuthController } from './auth.controller'; 
import { Instrutor } from '../Entity/instrutor.entity'; 
import { Aluno } from '../Entity/aluno.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Instrutor, Aluno]),
    JwtModule.register({
      secret: 'sua_chave_secreta', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [UsuarioService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
