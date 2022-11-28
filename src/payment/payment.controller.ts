import { Controller, Get, Post, Body, Query, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/CreatePaymentDto';
import { UpdatePaidPaymentDto } from './dto/UpdatePaymentDto';

@Controller('v2/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<any> {
    return await this.paymentService.create(createPaymentDto);
  }

  @Put()
  async updatePaidPayment(
    @Body() updatePaymentDto: UpdatePaidPaymentDto
  ): Promise<any> {
    return await this.paymentService.updatePaidPayment(updatePaymentDto);
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
