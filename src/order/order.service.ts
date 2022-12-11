import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateOrder } from './dto/CreateOrderDto';
import { IUpdateOrderMerchant } from './dto/UpdateOrderMerchant';
import { PaymentService } from '../payment/payment.service';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    private paymentService: PaymentService,
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

  async findCurrentChannelPendingOrder(
    channelID: number,
    subscriberID: string,
  ) {
    return await this.orderRepo.find({
      where: [
        {
          channel_id: channelID,
          subscriber_id: subscriberID,
          status: 'PENDING',
        },
        {
          channel_id: channelID,
          subscriber_id: subscriberID,
          status: 'CANCELLED',
        },
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findSubscriberPendingOrder(subscriberID: string) {
    return await this.orderRepo.find({
      where: [
        {
          subscriber_id: subscriberID,
          status: 'PENDING',
        },
        {
          subscriber_id: subscriberID,
          status: 'CANCELLED',
        },
      ],
      order: {
        created_at: 'DESC',
      },
    });
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

    return await this.orderRepo.save(updated_order);
  }

  async updatePaidOrder(orderID: string) {
    const order = await this.findOne(orderID);

    const paymentPayload = {
      orderID: order.id,
      channelID: order.channel_id,
      totalAmount: order.amount,
    };

    await this.paymentService.createPayment(paymentPayload);

    const updated_order = {
      ...order,
      status: 'PAID',
    };

    return await this.orderRepo.save(updated_order);
  }

  async cancelOrder(orderID: string) {
    const order = await this.findOne(orderID);

    const updated_order = {
      ...order,
      status: 'CANCELLED',
    };

    return await this.orderRepo.save(updated_order);
  }

  async updateConfirmingOrder(orderID: string) {
    const order = await this.findOne(orderID);

    const updated_order = {
      ...order,
      status: 'CONFIRMING',
    };

    return await this.orderRepo.save(updated_order);
  }

  async updatePendingOrder(orderID: string) {
    const order = await this.findOne(orderID);

    const updated_order = {
      ...order,
      status: 'PENDING',
    };

    return await this.orderRepo.save(updated_order);
  }
}
