import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CreateRediDto } from './dto/create-redi.dto';
import { UpdateRediDto } from './dto/update-redi.dto';
import { JwtAuthGuard } from 'utils/auth.guard';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

@Controller('redis')
@UseGuards(JwtAuthGuard)
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post('/item/:bookId')
  addItem(@Body() createRediDto: CreateRediDto, @Param() param, @Req() req) {
    return this.redisService.addItem(createRediDto, param?.bookId, req);
  }
  @Post('/create-order')
  checkout(@Req() req, @Body() body: Pick<CreateOrderDto, 'deliveryLocation'>){
    return this.redisService.createOrder(req, body)
  }
  @Delete()
  deleteAllItems(@Req() req){
    const userId = req.user?.name
    return this.redisService.deleteAll(+userId)
  }
  @Get('/item')
  getUserItems(@Req() req) {
    return this.redisService.getUserItems(req.user?.name)
  }

  @Get('/item/:id')
  findOne(@Param('id') id: string) {
    return this.redisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRediDto: UpdateRediDto, @Req() req) {
    return this.redisService.update(+id, updateRediDto, req.user?.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.redisService.removeItem(+id, req.user?.name);
  }
}
