import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo)
    private moduloRepository: Repository<Modulo>,
  ){}
  
  async createModulo(moduloDTO: CreateModuloDto): Promise<Modulo> { 
    const modulo = new Modulo();
    modulo.titulo = moduloDTO.titulo;
    modulo.descricao = moduloDTO.descricao;
    modulo.ordem = moduloDTO.ordem;
    
    const savedModulo = await this.moduloRepository.save(modulo);

    if (!savedModulo) {
      throw new NotFoundException("Não foi possível cadastrar o módulo.");
    }

    if(!modulo){
      throw new NotFoundException ("Não foi possivel cadastrar o modulo.");
    }
    return this.moduloRepository.save(modulo); 
  }

  async update(id: number, updatemodulo: UpdateModuloDto): Promise<Modulo> {
    const modulo = await this.findOne(id);
    Object.assign(modulo, updatemodulo);
    return this.moduloRepository.save(modulo);
  }

  async remove(id: number): Promise<Modulo> {
    const modulo = await this.findOne(id);
    return this.moduloRepository.remove(modulo);
  }
  
  async findAll(): Promise<Modulo[]> {
    return await this.moduloRepository.find();
  }

  async findOne(id: number): Promise<Modulo> {
    const modulo = await this.moduloRepository.findOne({ where: { id } });
    if (!modulo) {
      throw new NotFoundException("Modulo não encontrado.");
    }
    return modulo;
  }
}
