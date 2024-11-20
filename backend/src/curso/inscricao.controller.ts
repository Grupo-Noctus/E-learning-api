import { Body, Controller, Post } from "@nestjs/common";
import { InscricaoService } from "./inscricao.service";
import { InscricaoDTO } from "src/curso/dto/inscricao.dto";

@Controller('inscricao')
export class InscricaoController{
    constructor(
        private readonly inscricaoService: InscricaoService,
    ){}

    @Post('criar')
    async fazerinscricao(@Body() inscricaoDto: InscricaoDTO): Promise<{ message: String}>{
        return await this.inscricaoService.fazerInscricao(inscricaoDto);
    }
}