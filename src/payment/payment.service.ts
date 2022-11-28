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


    const insertResult: any = await this.paymentReposistory.insert({
      balance: balance.id,
      channel_id: payload.channelID,
      subscriber_id: payload.subscriberID,
      subscription_duration: payload.subscriptionDuration,
      total_amount: payload.totalAmount,
      merchant: payload.merchant,
      merchant_order_id: payload.merchantOrderID,
      merchant_payment_link: payload.merchantPaymentLink
    });

    return insertResult;
  }

  async findBySubscriber(subscriberID: string): Promise<Payment[]> {
    return await this.paymentReposistory.findBy({
      subscriber_id: subscriberID,
    });
  }

  async findByChannel(channelID: number): Promise<Payment[]> {
    return await this.paymentReposistory.findBy({
      channel_id: channelID,
    });
  }
}
