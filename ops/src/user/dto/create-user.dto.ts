import {IsEnum, IsInt, IsNotEmpty, IsString} from 'class-validator'
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    username: string;
  
    @IsNotEmpty()
    email: string;
  
    @IsInt()
    age: number;
  
    @IsString()
    @IsEnum(['f', 'm', 'u'])
    gender: string;
  
    @IsNotEmpty()
    password: string;
  }
  
