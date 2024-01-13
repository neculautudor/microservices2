import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

export class BookItem {
    @IsNotEmpty()
    @IsNumber()
    bookId: number

    @IsNotEmpty()
    @IsNumber()
    amount: number
}

export class OrderDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => BookItem)
    books: BookItem[]
}