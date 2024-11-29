import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common"
import { ModuloService } from "./modulo.service";
import { ModuloDTO } from "./dto/modulo.dto";
import { ProgressoDTO } from "./dto/progresso.dto";
import { Progresso } from "./Entity/progresso.entity";
import { Modulo } from "./Entity/modulo.entity";

@Controller('modulo')
export class ModuloController {
    constructor(
        private readonly moduloService: ModuloService,
    ) { }

    @Post('criar')
    async criarModulo(@Body() moduloDto: ModuloDTO): Promise<{ message: String }> {
        return this.moduloService.criarModulo(moduloDto);
    }

    @Post('concluir')
    async concluirModulo(@Body() progressoDto: ProgressoDTO): Promise<{ message: String }> {
        return await this.moduloService.concluirModulo(progressoDto);
    }

    @Get('progresso/:id')
    async buscarProgresso(@Param('id', ParseIntPipe) id: number): Promise<Progresso[]> {
        return await this.moduloService.buscarProgresso(id);
    }

    @Patch('reordenar/:id_cruso')
    async reordenarModulos (@Param('id_curso') id_curso, @Body() reordenado: Modulo[]): Promise<{ message: String}>{
        return await this.moduloService.reordenarModulos(id_curso, reordenado);
    }
}