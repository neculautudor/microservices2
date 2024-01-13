import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Item } from "src/redis/entities/item.entity";

export class AddItem extends PickType(Item, ['bookId', 'amount'] as const){}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => AddItem)
    books: AddItem[]
}
