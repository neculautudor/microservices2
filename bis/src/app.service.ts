import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBook(id: string): string {
    return `Getting book with id ${id}`;
  }
}
