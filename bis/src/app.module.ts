import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import * as dotenv from 'dotenv'
import { Book } from './book/entities/book.entity';
dotenv.config()
@Module({
  imports: [TypeOrmModule.forRoot({
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
  BookModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
