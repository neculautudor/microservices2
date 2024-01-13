import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('books')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getBook(@Param('id') id: string): string {
    return this.appService.getBook(id);
  }
}
