import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceService } from '../balance/balance.service';
import { CreatePaymentDto } from './dto/CreatePaymentDto';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    private balanceService: BalanceService,
  ) {}

  async createPayment(payload: CreatePaymentDto) {
    const balance = await this.balanceService.findOneByChannel(payload.channelID);

    if (balance && balance.id) {
      const plaformFee = Math.floor(0.2 * payload.totalAmount); // 20% fee

      const payment = await this.paymentRepo.save({
        order_id: payload.orderID,
        balance_id: balance.id,
        channel_id: payload.channelID,
        total_amount: payload.totalAmount,
        net_amount: payload.totalAmount - plaformFee,
        platform_fee: plaformFee
      });

      if (payment && payment.id) {
        await this.balanceService.increaseBalanceAmount(balance.id, payment.net_amount);
      }
    }
  }
}
