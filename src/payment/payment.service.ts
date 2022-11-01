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
    private paymentReposistory: Repository<Payment>,

    private balanceService: BalanceService,
  ) {}

  async create(payload: CreatePaymentDto) {
    const balance: any = await this.balanceService.findOneByChannel(
      payload.channelID,
    );

    const channelNetIncome = Math.floor(0.8 * payload.totalAmount);
    const platformFee = payload.totalAmount - channelNetIncome;

    return this.paymentReposistory.insert({
      channel_balance_id: balance.id,
      channel_id: payload.channelID,
      channel_name: payload.channelName,
      subscriber_id: payload.subscriberID,
      subscriber_name: payload.subscriberName,
      subscription_duration: payload.subscriptionDuration,
      total_amount: payload.totalAmount,
      channel_net_income: channelNetIncome,
      platform_fee: platformFee,
    });
  }
}
