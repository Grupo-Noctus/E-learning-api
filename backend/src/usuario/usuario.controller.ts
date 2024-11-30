import { Body, Controller, Delete, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDTO } from "./dto/usuarioCreate.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from 'path';
import { diskStorage } from "multer";
import { UsuarioUpadateDTO } from "./dto/usuarioUpdate.dto";

const uploadFolder = path.resolve(process.cwd(), './uploads');
console.log('Caminho da pasta de uploads:', uploadFolder);

export function getFileInterceptor(fieldName: string) {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadFolder);
      },
      filename: (req, file, cb) => {
        const nomeArquivo = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, nomeArquivo + path.extname(file.originalname));
      },
    }),
  });
}

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService
  ) { }

  @Post('criar')
  @UseInterceptors(getFileInterceptor('foto_perfil'))
  async criarUsuario(
    @Body() usuarioDto: UsuarioDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: String }> {
    if (file) {
      usuarioDto.foto_perfil = file.filename;
    }
    return await this.usuarioService.criarUsuario(usuarioDto);
  }

  @Patch('editar/:id')
  async editarUsuario(@Param('id') id: number, @Body() usuarioUpdate: UsuarioUpadateDTO): Promise<{ message: String }> {
    return await this.usuarioService.editarusuario(id, usuarioUpdate);
  }

  @Delete('deletar/:id')
  async deletarUsuario(@Param('id') id: number): Promise<{ message: String }> {
    return await this.usuarioService.deletarUsuario(id);
  }
}