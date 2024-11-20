import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Modulo } from "./Entity/modulo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ModuloDTO } from "./dto/modulo.dto";
import { CursoService } from "./curso.service";

@Injectable()
export class ModuloService{
    constructor(
        @InjectRepository(Modulo)
        private readonly modulo: Repository<Modulo>,
        private readonly curosService: CursoService
    ){}

    async buscarModulo(id_modulo: number): Promise<(Modulo)>{
        return await this.modulo.findOne({
            where: { id_modulo },
          });
    }

    async verificarordem(id_curso: number, ordem: number): Promise<boolean> {
        const modulo = await this.modulo
          .createQueryBuilder('modulo')
          .innerJoin('modulo.curso', 'curso') // Faz o JOIN com a tabela curso
          .where('curso.id = :id_curso', { id_curso }) // Filtra pelo curso
          .andWhere('modulo.ordem = :ordem', { ordem }) // Filtra pela ordem
          .getOne();
    
        return !!modulo
    }

    async criarModulo(moduloDto: ModuloDTO): Promise<{message: String}>{
        const modulo = new Modulo();
        const curso = await this.curosService.buscarCurso(moduloDto.id_curso);

        modulo.titulo = moduloDto.titulo;
        modulo.descricao = moduloDto.descricao;
        if(this.verificarordem(moduloDto.id_curso, moduloDto.ordem)){
            return{ message: "Essa ordrm já está sendo usada nesse curso"}
        }
        modulo.ordem = moduloDto.ordem;
        modulo.curso = curso;
        
        await this.modulo.save(modulo);
        return {message: "Modulo cadastrado com sucesso!"}
    }
}