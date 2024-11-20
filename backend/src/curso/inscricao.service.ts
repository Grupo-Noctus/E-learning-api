import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InscricaoDTO } from "src/curso/dto/inscricao.dto";
import { Inscricao } from "src/curso/Entity/inscricao.entity";
import { Status } from "src/curso/Entity/statusEnum";
import { AlunoService } from "src/usuario/aluno.service";
import { Repository } from "typeorm";
import { CursoService } from "./curso.service";

@Injectable()
export class InscricaoService{
    constructor(
        @InjectRepository(Inscricao)
        private readonly inscricao: Repository<Inscricao>,
        private readonly alunoService: AlunoService,
        @Inject(forwardRef(() => CursoService))
        private readonly cursoService: CursoService
    ){}

    async fazerInscricao (inscricaoDto: InscricaoDTO): Promise<{message: String}>{
        const inscricao = new Inscricao();

        try{
            inscricao.aluno = await this.alunoService.findAlunoById(inscricaoDto.id_aluno)
            inscricao.curso = await this.cursoService.buscarCurso(inscricaoDto.id_curso)
            inscricao.status = Status.EMANDAMENTO;

            await this.inscricao.save(inscricao);
            return{ message: "Inscrição realizada!" }  
        }catch(error){
            console.log(error)
            return{ message: "Não foi possível cadastrar a inscricao!" }
        }
    }

    async buscarIncrição(id_inscricao: number): Promise<Inscricao>{
        const verificacao = await this.inscricao.findOne({
            where: { id_inscricao },
        });
        if (!verificacao) {
            throw new NotFoundException(`Inscrição com id: ${id_inscricao} não encontrado.`);
        }
        return verificacao;
    }
}