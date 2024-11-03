import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile,Put, Patch, NotFoundException } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Curso } from './entities/curso.entity';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Get()
  async getCursos(): Promise<Curso[]>{
    const cursos = await this.cursoService.findAll();
    if (!cursos){
      throw new NotFoundException ("Nenhum curso cadastrado!!");
    }
    return cursos;
  }

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
      throw new NotFoundException ("Curso não encontrado!!")
    }
    return { message: 'Curso criado com sucesso!', curso}
  }

  @Put('update/:id')
  async update(@Body() updateCursoDto: UpdateCursoDto, @Param('id') id: number){
    await this.cursoService.update(id, updateCursoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cursoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cursoService.remove(id);
  }
}