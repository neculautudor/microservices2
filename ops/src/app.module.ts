import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv'
import { User } from './user/entities/user.entity';
import { Order } from './order/entities/order.entity';
import { RedisModule } from './redis/redis.module';
import { Item } from './redis/entities/item.entity';
dotenv.config()
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    entities: [User, Order, Item],
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
  }),
  OrderModule,
  UserModule,
  RedisModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
