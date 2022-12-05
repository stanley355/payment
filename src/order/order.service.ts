import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateOrder } from './dto/CreateOrderDto';
import { IUpdateOrderMerchant } from './dto/UpdateOrderMerchant';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async create(payload: ICreateOrder) {
    return this.orderRepo.save({
      channel_id: payload.channelID,
      subscriber_id: payload.subscriberID,
      subscription_duration: payload.subscriptionDuration,
      amount: payload.amount,
    });
  }

  async findOne(orderID: string) {
    return await this.orderRepo.findOneBy({ id: orderID });
  }

  async findAllBySubscriber(subscriberID: string) {
    return await this.orderRepo.findBy({ subscriber_id: subscriberID });
  }

  async updateOrderMerchant(payload: IUpdateOrderMerchant) {
    const order = await this.findOne(payload.orderID);

    const updated_order = {
      ...order,
      merchant: payload.merchant,
      ...(payload.merchantOrderID && {
        merchant_order_id: payload.merchantOrderID,
      }),
      ...(payload.merchantVAnumber && {
        merchant_va_number: payload.merchantVAnumber,
      }),
      ...(payload.merchantVAnumber && {
        merchant_payment_link: payload.merchantPaymentLink,
      }),
      ...(payload.expiredAt && { expired_at: payload.expiredAt }),
    };

    console.log(updated_order);

    return ""
    // return await this.orderRepo.save(updated_order);
  }

  async findCurrentChannelPendingOrder(
    channelID: number,
    subscriberID: string,
  ) {
    return await this.orderRepo.find({
      where: {
        channel_id: channelID,
        subscriber_id: subscriberID,
        status: 'PENDING',
      },
      order: {
        created_at: 'DESC',
      },
    });
  }
}
