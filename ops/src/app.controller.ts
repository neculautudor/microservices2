import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getBook(@Param('id') id: string): string {
    return this.appService.getOrder(id);
  }
}
