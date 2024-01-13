import { Body, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { BISService } from './order.bisservice';
import flatted from 'flatted'
@Injectable()
export class OrderService{
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly bisService: BISService,
    private readonly dataSource: DataSource
  ){}
  async create(createOrderDto: CreateOrderDto, req) {
    const userId = req?.user?.name
    const queryRunner = await this.dataSource.createQueryRunner()
    const logger = new Logger()
    try{
      await queryRunner.connect()
      await queryRunner.startTransaction()
      const newOrder = await queryRunner.manager.create(Order, {
        ...createOrderDto,
        userId: userId
      })
      const result = await queryRunner.manager.save(Order, newOrder)
      const bisUpdateResult = await this.bisService.postOrder(createOrderDto)
      if(bisUpdateResult?.data?.error){
        return {
          message: "Error adding order",
          bookServiceErrorMessage: bisUpdateResult?.data?.message,
          error: bisUpdateResult?.data?.error
        }
      }
      await queryRunner.commitTransaction()
      return {
        data: result,
        message: "Order added successfully"
      }
    } catch(error){
      await queryRunner.rollbackTransaction()
      return {
        message: "Error adding order",
        error: error.message
      }
    } finally {
      await queryRunner.release()
    }

  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
