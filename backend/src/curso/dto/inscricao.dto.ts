import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Status } from '../Entity/statusEnum';

export class InscricaoDTO {
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsInt({ message: 'ID do aluno deve ser um número inteiro.' })
  id_aluno: number;

  @IsInt({ message: 'ID do curso deve ser um número inteiro.' })
  id_curso: number;
}
