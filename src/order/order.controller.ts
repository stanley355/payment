import { Controller, Post, Body} from '@nestjs/common';
import { ICreateOrder } from './dto/CreateOrderDto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  
  @Post()
  async createOrder(
    @Body() payload: ICreateOrder,
  ): Promise<any> {
    return await this.orderService.create(payload);
  }
}
