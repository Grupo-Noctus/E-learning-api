import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Post('creat')
  @UseInterceptors(
    FileInterceptor('imagem', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        },
      }),
    }),
  )
  
  async create(@Body() createCursoDto: CreateCursoDto, @UploadedFile() file: Express.Multer.File) {
    console.log('Received file:', file);
    if (!file) {
      throw new Error('No file uploaded!');
    }
    const curso = await this.cursoService.createCurso({...createCursoDto, imagem: file.filename});
    if(!curso){
      throw new Error('Algum campo deve estar inválido!');
    }
    return { message: 'Curso criado com sucesso!', curso}
  }


  @Get()
  findAll() {
    return this.cursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }
}
