import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioCreateDTO } from "./dto/usuarioCreate.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from 'path';
import { diskStorage } from "multer";

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
export class UsuarioController{
    constructor(
        private readonly usuarioService: UsuarioService
    ){}

    @Post('criar')
    @UseInterceptors(getFileInterceptor('foto_perfil'))
    async criarUsuario(
        @Body() usuarioDto: UsuarioCreateDTO,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<{ message: String }>{
        if (file) {
            usuarioDto.foto_perfil = file.filename;
          }
        return await this.usuarioService.criarUsuario(usuarioDto);
    }
}