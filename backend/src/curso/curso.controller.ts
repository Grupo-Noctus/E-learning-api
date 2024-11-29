
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoDTO } from './dto/curso.dto';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AvaliacaoDTO } from './dto/avaliacao.dto';
import { CursoUpadateDTO } from './dto/cursoUpadate.dto';

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

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Get('pegar-todos')
  async pegarTodosCurso() {
    return await this.cursoService.buscarTodosCurso();
  }

  @Get('buscar/:id')
  async buscarCurso(@Param('id') id: number) {
    return this.cursoService.buscarCurso(id);
  }

  @Post('criar')
  @UseInterceptors(getFileInterceptor('imagem'))
  async criarCurso(
    @Body() cursoDto: CursoDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: String }> {
    if (file) {
      cursoDto.imagem = file.filename;
    }
    return await this.cursoService.criarCurso(cursoDto);
  }

  @Post('avaliar')
  async avaliarCurso(
    @Body() avaliacaoDto: AvaliacaoDTO,
  ): Promise<{ message: String }> {
    return await this.cursoService.avaliarCurso(avaliacaoDto);
  }
  @Patch('editar/:id')
  async editarCurso(@Param('id') id: number, @Body() cursoUpadateDto: CursoUpadateDTO): Promise<{ message: String}>{
    return await this.cursoService.editarCurso(cursoUpadateDto, id);
  }

  @Delete('/deletar/:id')
    async deletarCurso(@Param('id') id: number): Promise < { message: String } > {
    return await this.cursoService.deletarCurso(id);
  }
}
