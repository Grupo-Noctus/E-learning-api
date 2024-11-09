import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Get()
  async getCursos(): Promise<Curso[]>{
    return await this.cursoService.findAll();
  }

  @Post('creat')
  async create(@Body() createCursoDto: CreateCursoDto): Promise<{ message }> {
    await this.cursoService.createCurso(createCursoDto);
    return { message: 'Curso criado com sucesso!'}
  }

  @Put('update/:id')
  async update(@Body() updateCursoDto: UpdateCursoDto, @Param('id') id: number): Promise<{ message }>{
    await this.cursoService.update(id, updateCursoDto);
    return { message: 'Curso Atualizado com sucesso!'}
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Curso> {
    return await this.cursoService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message }>{
    await this.cursoService.remove(id);
    return { message: 'Curso removido!'}
  }
}
  // import { FileInterceptor } from '@nestjs/platform-express';
  // import { diskStorage } from 'multer';
  // @UseInterceptors(
  //   FileInterceptor('imagem', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         cb(null, uniqueSuffix + '-' + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // ,  @UploadedFile() file: Express.Multer.File
  //({...createCursoDto, imagem: file.filename})
  // if (!file) {
  //   throw new Error('No file uploaded!');
  // }