import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { OrderDto } from './dto/update-from-order.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly dataSource: DataSource
  ) {}
  async create(createBookDto: CreateBookDto) {
    try{
      const newBook = await this.bookRepository.create(createBookDto)
      const result = await this.bookRepository.save(newBook)
      return {
        message: "Book added successfully",
        data: result}
    } catch(error){
      return {
        message: "Error creating a book",
        error: error.message
      }
    }

  }

  async findAll() {
    try{
      const allBooks = await this.bookRepository.find()
      return allBooks
    } catch(error){
      return {
        message: "Error creating a book",
        error: error.message
      }
    }
  }

  async findOne(id: number) {
    try{
      const book = await this.bookRepository.findOne({where: {id: id}})
      return book
    } catch(error){
      return {
        message: "Error finding book",
        error: error.message
      }
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try{
      await this.bookRepository.update(id, updateBookDto)
      return {message: "Book updated successfully"}
    }catch (error){
      return {
        message: "Error updating book",
        error: error.message
      }
    }

  }

  async remove(id: number) {
    try{
       await this.bookRepository.delete(id)
      return {message: "Book deleted successfully"}
    }
  catch(error){
    return {
      message: "Error deleting book",
      error: error.message
    }
  }
}

async updateFromOrder(booksData: OrderDto){
  const booksMap = booksData.books.reduce((map, book) => {
    map[book.bookId] = book.amount
    return map
  }, {})
  const bookIds = booksData.books.map((book) => book.bookId)
  let queryRunner = null

  try{
    queryRunner = await this.dataSource.createQueryRunner()
    const dbBooks = await this.bookRepository.find({
      select: {
        id: true,
        available: true
      },
      where: {
        id: In([...bookIds])
      }
    })
    const dbBooksMap = dbBooks.reduce((map, book) => {
      map[book.id] = book.available
      return map
    }, {})
    await queryRunner.connect()
    await queryRunner.startTransaction()
    for(const bookId of bookIds){
      const availableBooks = dbBooksMap?.[bookId]
      const requestedBooks = booksMap?.[bookId]
      if(!availableBooks){
        throw new Error(`Book with id ${bookId} is not available`)
      }
      if(requestedBooks > availableBooks){
        throw new Error(`There are only ${availableBooks} available books with id ${bookId}`)
      }
      const remainingBooks = availableBooks - requestedBooks
      await queryRunner.manager.update(Book, {id: bookId}, {available: remainingBooks})
    }
    await queryRunner.commitTransaction()
    return {
      message: "Successfully ordered all books!"
    }
  }catch(error){
    const logger = new Logger('books')
    logger.log(error)
    await queryRunner.rollbackTransaction()
    return {
      message: "Error updating the books",
      error: error.message
    }
  } finally {
    await queryRunner.release()
  }
}

async booksCount(){
  try{
    const booksLeft = await this.bookRepository.count()
    return booksLeft
  }catch(error){
    return {
      message: "Error checking books count",
      error: error.message
    }
  }
}
}
