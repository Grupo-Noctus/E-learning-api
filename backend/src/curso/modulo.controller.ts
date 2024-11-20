import { Body, Controller, Post } from "@nestjs/common"
import { ModuloService } from "./modulo.service";
import { ModuloDTO } from "./dto/modulo.dto";

@Controller('modulo')
export class ModuloController{
    constructor(
        private readonly moduloService: ModuloService,
    ){}

    @Post('criar')
    async criarModulo(@Body() moduloDto: ModuloDTO): Promise<{message: String}>{
        return this.moduloService.criarModulo(moduloDto);
    }
}