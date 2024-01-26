import { Body, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { BISService } from './order.bisservice';
@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		private readonly bisService: BISService,
		private readonly dataSource: DataSource
	) { }
	async create(createOrderDto: CreateOrderDto, req) {
		const userId = req?.user?.name
		const queryRunner = await this.dataSource.createQueryRunner()
		try {
			await queryRunner.connect()
			await queryRunner.startTransaction()
			const newOrder = await queryRunner.manager.create(Order, {
				...createOrderDto,
				userId: userId
			})
			const result = await queryRunner.manager.save(Order, newOrder)
			const bisUpdateResult = await this.bisService.postOrder({ books: createOrderDto.books })
			if (bisUpdateResult?.data?.error) {
				await queryRunner.rollbackTransaction()
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
		} catch (error) {
			await queryRunner.rollbackTransaction()
			return {
				message: "Error adding order",
				error: error.message
			}
		} finally {
			await queryRunner.release()
		}

	}

	async findAll() {
		try {
			const allOrders = await this.orderRepository.find()
			return { orders: allOrders }
		} catch (error) {
			return {
				message: "Error getting the orders",
				erorr: error.message
			}
		}
	}

	findOne(id: number) {
		try {
			const order = this.orderRepository.findOne({ where: { id: id } })
			return { order: order }
		} catch (error) {
			return {
				message: "Error getting the order",
				error: error.message
			}
		}
	}

	async update(id: number, updateOrderDto: UpdateOrderDto) {
		//only deliveryLocation update is available, because updating books as well would be too hard to maintain, and not realistically worth it
		try {
			await this.orderRepository.update(id, updateOrderDto)
		} catch (error) {
			return {
				message: "Error updating the order",
				error: error.message
			}
		}
	}

	async remove(id: number) {
		try {
			await this.orderRepository.delete(id)
		} catch (error) {
			return {
				message: "Error deleting the order",
				error: error.message
			}
		}
	}
}
