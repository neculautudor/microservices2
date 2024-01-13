import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Item {

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User

    @PrimaryColumn()
    userId: number
    
    @PrimaryColumn()
    bookId: number

    @Column()
    amount: number

}