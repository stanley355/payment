import { Controller, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('channels')
  async findChannelPayments(@Query('channelID') channelID: number): Promise<any> {
    return await this.paymentService.findPaymentsByChannel(channelID);
  }
}
