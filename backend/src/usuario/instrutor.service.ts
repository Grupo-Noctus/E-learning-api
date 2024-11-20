import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Instrutor } from "./Entity/instrutor.entity";
import { Repository } from "typeorm";

@Injectable()
export class InstrutorService{
    constructor(
        @InjectRepository(Instrutor)
        private readonly instrutor : Repository<Instrutor>,
    ){}

    async findInstrutorById(id_instrutor: number): Promise<Instrutor> {
        const instrutor = await this.instrutor.findOne({
          where: { id_instrutor },
        });
    
        if (!instrutor) {
          throw new NotFoundException(`Professor com id: ${id_instrutor} não encontrado.`);
        }
    
        return instrutor;
      }
}