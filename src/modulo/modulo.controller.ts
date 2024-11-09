import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { Modulo } from './entities/modulo.entity';

@Controller('modulo')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Get()
  async getmodulos(): Promise<Modulo[]>{
    return await this.moduloService.findAll();
  }

  @Post('creat')
  async create(@Body() createmoduloDto: CreateModuloDto): Promise<{ message }> {
    await this.moduloService.createModulo(createmoduloDto);
    return { message: 'modulo criado com sucesso!'}
  }

  @Put('update/:id')
  async update(@Body() updatemoduloDto: UpdateModuloDto, @Param('id') id: number): Promise<{ message }>{
    await this.moduloService.update(id, updatemoduloDto);
    return { message: 'modulo Atualizado com sucesso!'}
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Modulo> {
    return await this.moduloService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message }>{
    await this.moduloService.remove(id);
    return { message: 'modulo removido!'}
  }
}
