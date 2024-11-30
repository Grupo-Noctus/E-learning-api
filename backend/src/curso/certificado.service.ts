import { Injectable, NotFoundException } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificado } from './Entity/certificado.entity';
import { Inscricao } from './Entity/inscricao.entity';
import { Status } from './Entity/statusEnum';
import { Progresso } from './Entity/progresso.entity';

@Injectable()
export class CertificadoService {
  constructor(
    @InjectRepository(Certificado)
    private readonly certificadoRepository: Repository<Certificado>,
    @InjectRepository(Inscricao)
    private readonly inscricaoRepository: Repository<Inscricao>,
  ) {}

  async generateCertificate(response: Response, inscricaoId: number): Promise<void> {
    
    const inscricao = await this.inscricaoRepository.findOne({
      where: { id_inscricao: inscricaoId },
      relations: ['usuario', 'curso'],
    });

    if (!inscricao) {
      throw new NotFoundException('Inscrição não encontrada');
    }

    const nomeUsuario = inscricao.aluno.usuario; 
    const nomeCurso = inscricao.curso.titulo; 

    const dataAtual = new Date();
       const formattedDate = `${dataAtual.getDate().toString().padStart(2, '0')}/${
        (dataAtual.getMonth() + 1).toString().padStart(2, '0')
       }/${dataAtual.getFullYear()}`;

    const doc = new PDFDocument();

    // cabecalho
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=certificado-${nomeUsuario}.pdf`,
    );

    if ( Status.CONCLUIDO)
        doc.pipe(response);

    doc.fontSize(20).text('Certificado de Conclusão', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(
      `Certificamos que ${nomeUsuario} concluiu o curso de ${nomeCurso}.
      Termino do curso: ${dataAtual}`,
      { align: 'center' },
    );

    
    doc.end();

    const certificado = this.certificadoRepository.create({
      inscricao,
      data_emissao: new Date(),
    });
    await this.certificadoRepository.save(certificado);
  }
}
