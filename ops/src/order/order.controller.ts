import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'utils/auth.guard';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) { }

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
		return this.orderService.create(createOrderDto, req);
	}

	@Get()
	findAll() {
		return this.orderService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.orderService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
		return this.orderService.update(+id, updateOrderDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.orderService.remove(+id);
	}
}
