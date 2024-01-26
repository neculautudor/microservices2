import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['title', 'author_first_name', 'author_last_name'])
export class Book {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	description: string;

	@IsNotEmpty()
	@Column()
	title: string;

	@Column()
	year: number;

	@Column()
	author_first_name: string;

	@Column()
	author_last_name: string;

	@Column({ default: 1 })
	available: number;

	constructor(
		description: string,
		title: string,
		year: number,
		author_first_name: string,
		author_last_name: string
	) {
		this.description = description;
		this.title = title;
		this.year = year;
		this.author_first_name = author_first_name;
		this.author_last_name = author_last_name;
	}
}
