import { IsInt, IsNotEmpty } from "class-validator";

export class ProgressoDTO {
    @IsInt({ message: 'O ID da inscrição deve ser um número inteiro.' })
    @IsNotEmpty({ message: 'O ID da inscrição é obrigatório.' })
    id_inscricao: number;

    @IsInt({ message: 'O ID do módulo deve ser um número inteiro.' })
    @IsNotEmpty({ message: 'O ID do modulo é obrigatório.' })
    id_modulo: number;
}
