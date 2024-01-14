import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), OrderModule],
  controllers: [RedisController],
  providers: [RedisService],
})
export class RedisModule {}
