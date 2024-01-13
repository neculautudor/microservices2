import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsNumber()
    readonly year: number;

    @IsNotEmpty()
    @IsString()
    readonly author_first_name: string;

    @IsNotEmpty()
    @IsString()
    readonly author_last_name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly available: number;
}
