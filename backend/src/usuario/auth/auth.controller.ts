import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsuarioService } from '../usuario.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usuarioService: UsuarioService
  ) { }

  @Post('login')
  async login(@Body() body: { email: string, senha: string, id: number, papel: string }): Promise<{ usuario: any }> {
    const { id, senha } = body;
    try {
      const usuario = await this.usuarioService.findById(id);
      if (!usuario) {
        throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
      }
      console.log(senha, usuario.senha);
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        throw new HttpException('Senha incorreta.', HttpStatus.UNAUTHORIZED);
      }

      return { usuario: { email: usuario.email, id: usuario.id_usuario, papel: usuario.papel } }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
