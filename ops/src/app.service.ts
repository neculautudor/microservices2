import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOrder(id: string): string {
    return `Getting order with id ${id}`;
  }
}
