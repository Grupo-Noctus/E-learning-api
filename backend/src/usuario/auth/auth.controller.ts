import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsuarioService } from '../usuario.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usuarioService: UsuarioService
  ) {}

  @Post('login')
  async login(@Body() body: { email: string, senha: string }): Promise<string> {
    const { email, senha } = body;
    try {
      const usuario = await this.usuarioService.findOneByEmail(email);
      if (!usuario) {
        throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
      }
      console.log(senha, usuario.senha);
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        throw new HttpException('Senha incorreta.', HttpStatus.UNAUTHORIZED);
      }

      
      const message = 'Login realizado com sucesso!';
      console.log(message);

      return message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
