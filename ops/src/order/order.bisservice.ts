import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class BISService {
    constructor(private readonly httpService: HttpService){}
    postOrder(data: Pick<CreateOrderDto, 'books'>){
        const url = 'http://localhost:3001/book/order'
        const result = firstValueFrom(this.httpService.post(url, data))
        return result
    }
}