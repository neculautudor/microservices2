import {  PickType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

//only deliveryLocation update is available, because updating books as well would be too hard to maintain, and not realistically worth it
export class UpdateOrderDto extends PickType(CreateOrderDto, ['deliveryLocation']) {}
