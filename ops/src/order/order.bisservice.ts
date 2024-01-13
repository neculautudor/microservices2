import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BISService {
    constructor(private readonly httpService: HttpService){}
    postOrder(data: any){
        const url = 'http://localhost:3001/book/order'
        const result = firstValueFrom(this.httpService.patch(url, data))
        return result
    }
}