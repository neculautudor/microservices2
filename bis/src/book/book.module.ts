import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import * as dotenv from "dotenv"
dotenv.config()
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			password: process.env.DB_PASSWORD,
			username: process.env.DB_USERNAME,
			entities: [Book],
			database: process.env.DB_NAME,
			synchronize: true,
			logging: true,
		}),
		TypeOrmModule.forFeature([Book]),
	],
	controllers: [BookController],
	providers: [BookService],
})
export class BookModule { }
