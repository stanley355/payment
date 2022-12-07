import { Controller, Get, Post, Body, Query, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/CreatePaymentDto';
import { UpdatePaidPaymentDto } from './dto/UpdatePaymentDto';

@Controller('/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

}
