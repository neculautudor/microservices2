import { Entity, Unique } from "typeorm";

@Entity()
@Unique([''])
export class CreateOrderDto {}
