import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AddItem } from "../dto/create-order.dto";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    user: User

    @Column()
    userId: number;

    @Column('jsonb')
    books: AddItem[]

    @Column({type: 'timestamptz', default: () => "CURRENT_TIMESTAMP"})
    time: Date

    @Column({default: "America Maryland Oceancity 4532"})
    deliveryLocation: String
    
}
