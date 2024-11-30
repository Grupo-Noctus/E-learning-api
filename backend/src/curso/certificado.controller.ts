import { Controller, Get, Param, Res } from '@nestjs/common';
import { CertificadoService } from './certificado.service';
import { Response } from 'express';

@Controller('certificados')
export class CertificadoController {
  constructor(private readonly certificadoService: CertificadoService) {}

  @Get(':inscricaoId/download')
  async downloadCertificate(
    @Res() response: Response,
    @Param('inscricaoId') inscricaoId: number,
  ) {
    await this.certificadoService.generateCertificate(response, inscricaoId);
  }
}

