import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { HttpModule } from '@nestjs/axios'
import { BISService } from './order.bisservice';
@Module({
  imports: [TypeOrmModule.forFeature([Order]), HttpModule],
  controllers: [OrderController],
  providers: [OrderService, BISService],
  exports: [OrderService]
})
export class OrderModule {}
