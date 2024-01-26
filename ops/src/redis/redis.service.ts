import { Injectable, Logger } from '@nestjs/common';
import { CreateRediDto } from './dto/create-redi.dto';
import { UpdateRediDto } from './dto/update-redi.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { AddItem, CreateOrderDto } from 'src/order/dto/create-order.dto';

@Injectable()
export class RedisService {
	constructor(
		@InjectRepository(Item)
		private readonly itemRepository: Repository<Item>,
		private readonly orderService: OrderService
	) { }

	async createOrder(req, body: Pick<CreateOrderDto, 'deliveryLocation'>) {
		const deliveryLocation = body?.deliveryLocation
		if (!deliveryLocation) {
			return {
				message: "Error creating order",
				error: "Delivery location is undefined"
			}
		}
		try {
			const rawItems = await this.getUserItems(req.user?.name)
			const items = rawItems?.items?.map((item) => ({ bookId: item.bookId, amount: item.amount }))
			if (!items || !items.length || typeof items === void []) {
				return {
					message: "Error creating order",
					error: "No items to be checked out"
				}
			}

			//@ts-ignore
			// already guarding from items being void[] above
			const createOrderResult = await this.orderService.create({ books: items, deliveryLocation: deliveryLocation }, req)
			//after the order has been successfull, we remove the items from the cart
			await this.deleteAll(req.user?.name)
			return {
				createOrderResult
			}
		} catch (error) {
			return {
				message: "Error creating order",
				error: error.message
			}
		}
		// this.orderService.create()
	}
	async getUserItems(userId) {
		if (isNaN(Number(userId))) {
			return {
				error: "The userId parameter must be a number"
			}
		}
		try {
			const items = await this.itemRepository.find({ where: { userId: userId }, select: ['id', 'bookId', 'amount'] })
			return {
				items: items
			}
		} catch (error) {
			return {
				message: "Error getting user items",
				error: error.message
			}
		}
	}

	async addItem(item: CreateRediDto, bookId, req) {
		const userId = req.user?.name
		if (isNaN(Number(bookId))) {
			return {
				error: "The bookId parameter must be a number"
			}
		}
		try {
			const newItem = await this.itemRepository.create({ ...item, userId: userId, bookId: bookId })
			const addResult = await this.itemRepository.save(newItem)
			return {
				message: `Successfully added item with id${addResult.id}`
			}
		} catch (error) {
			return {
				message: "Error adding item",
				error: error.message
			}
		}
	}

	async findAll() {
		try {
			const items = await this.itemRepository.find()
			return {
				items: items
			}
		} catch (error) {
			return {
				message: "Error getting items",
				error: error.message
			}
		}
	}

	async findOne(id: number) {
		if (isNaN(id)) {
			return {
				message: "Error getting item",
				error: "Id must be a number"
			}
		}
		try {
			const item = await this.itemRepository.findOne({ where: { id: id } })
			return {
				item: item
			}
		} catch (error) {
			return {
				message: "Error getting item",
				error: error.message
			}
		}
	}

	async update(id: number, updateRediDto: UpdateRediDto, userId: number) {
		const item = await this.findOne(id)
		if (userId !== item.item.userId) {
			return {
				message: "Error updating item",
				error: "This item belongs to another user's cart"
			}
		}
		try {
			await this.itemRepository.update(id, updateRediDto)
			return {
				message: "Successfully updated item"
			}
		} catch (error) {
			return {
				message: "Error updating item",
				error: error.message
			}
		}
	}

	async removeItem(id: number, userId: number) {
		if (isNaN(Number(id))) {
			return {
				error: "The bookId parameter must be a number"
			}
		}
		const item = await this.findOne(id)
		if (userId !== item.item.userId) {
			return {
				message: "Error updating item",
				error: "This item belongs to another user's cart"
			}
		}
		try {
			const result = await this.itemRepository.delete(id)
			if (!result.affected) {
				return {
					message: "Item inexistent"
				}
			}
			return {
				result: result,
				message: "Successfully deleted item"
			}
		} catch (error) {
			return {
				message: "Error deleting item",
				error: error.message
			}
		}
	}
	async deleteAll(userId) {
		if (isNaN(userId)) {
			return {
				error: "User id is not a number",
				message: "Error deleting all items from cart"
			}
		}
		try {
			await this.itemRepository.delete({ userId: userId })
			return {
				message: `User with id ${userId} has successfully deleted all their items`
			}
		} catch (error) {
			return {
				message: "Error deleting items",
				error: error.message
			}
		}
	}
}
