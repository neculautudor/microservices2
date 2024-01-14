import { IsNotEmpty, IsNumber } from "class-validator";
import { Item } from "../entities/item.entity";
import { Type } from "class-transformer";
import { Entity } from "typeorm";
export class CreateRediDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number
}
