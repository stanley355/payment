import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/CreatePaymentDto';

@Controller('v1/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<any> {
    return await this.paymentService.create(createPaymentDto);
  }

  @Get('/subscibers')
  async viewPayments(@Query('subscriberID') subscriberID): Promise<any> {
    return await this.paymentService.findBySubscriber(subscriberID);
  }
}
