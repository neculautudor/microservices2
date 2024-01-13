import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { OrderDto } from './dto/update-from-order.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Patch('/order')
  updateFromOrder(@Body() orderDto: OrderDto){
    const logger = new Logger("app")
    logger.log('reveiced request')
    return this.bookService.updateFromOrder(orderDto)
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }
  
  @Get('/total')
  booksCount(){
    return this.bookService.booksCount()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
