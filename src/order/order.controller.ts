import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  HttpException,
} from '@nestjs/common';
import { ICreateOrder } from './dto/CreateOrderDto';
import { IUpdateOrderMerchant } from './dto/UpdateOrderMerchant';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() payload: ICreateOrder): Promise<any> {
    return await this.orderService.create(payload);
  }

  @Get()
  async findOne(@Query('orderID') orderID: string): Promise<any> {
    return await this.orderService.findOne(orderID);
  }

  @Get('subscriber')
  async findAllBySubscriber(
    @Query('subscriberID') subscriberID: string,
  ): Promise<any> {
    return await this.orderService.findAllBySubscriber(subscriberID);
  }

  @Get('/subscriber/pending')
  async findSubscriberPendingOrder(
    @Query('subscriberID') subscriberID: string,
  ): Promise<any> {
    return await this.orderService.findSubscriberPendingOrder(subscriberID);
  }

  @Get('/channel/pending')
  async findCurrentChannelPendingOrder(
    @Query('channelID') channelID: number,
    @Query('subscriberID') subsriberID: string,
  ): Promise<any> {
    return await this.orderService.findCurrentChannelPendingOrder(
      channelID,
      subsriberID,
    );
  }

  @Put()
  async updateOrderMerchante(
    @Body() payload: IUpdateOrderMerchant,
  ): Promise<any> {
    const validMerchant = ['DOKU', 'KONTENKU'];
    if (!validMerchant.includes(payload.merchant)) {
      throw new HttpException('Merchant tidak valid', 400);
    }
    return await this.orderService.updateOrderMerchant(payload);
  }

  @Put('cancel')
  async cancelOrder(@Query('orderID') orderID: string): Promise<any> {
    return await this.orderService.cancelOrder(orderID);
  }
}
