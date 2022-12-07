import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { PaymentModule } from 'src/payment/payment.module';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  providers: [OrderService, PaymentService],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order]), PaymentModule],
  exports: [TypeOrmModule],
})
export class OrderModule {}
