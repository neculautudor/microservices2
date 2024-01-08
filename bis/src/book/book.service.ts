import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
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
