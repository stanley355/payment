import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/CreatePaymentDto';

@Controller('v2/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<any> {
    return await this.paymentService.create(createPaymentDto);
  }

  @Get('/channels')
  async viewPaymentsByChannel(@Query('channelID') channelID: number): Promise<any> {
    return await this.paymentService.findByChannel(channelID);
  }

  @Get('/subscribers')
  async viewPaymentsBySubsribers(@Query('subscriberID') subscriberID: string): Promise<any> {
    return await this.paymentService.findBySubscriber(subscriberID);
  }
}
