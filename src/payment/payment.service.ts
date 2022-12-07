import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceService } from '../balance/balance.service';
import { CreatePaymentDto } from './dto/CreatePaymentDto';
import { UpdatePaidPaymentDto } from './dto/UpdatePaymentDto';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentReposistory: Repository<Payment>,

    private balanceService: BalanceService,
  ) {}
}
