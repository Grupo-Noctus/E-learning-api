import { IsEnum } from "class-validator";
import { Status } from "../Entity/statusEnum";

export class ProgressoDTO{
    @IsEnum(Status)
    status: Status;
}