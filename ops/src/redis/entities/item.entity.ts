import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique('This item is already in the cart', ['userId', 'bookId'])
export class Item {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User

    @Column()
    userId: number
    
    @Column()
    bookId: number

    @Column()
    amount: number

}