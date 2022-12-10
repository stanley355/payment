import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { PaymentModule } from 'src/payment/payment.module';
import { PaymentService } from 'src/payment/payment.service';
import { BalanceService } from 'src/balance/balance.service';
import { BalanceModule } from 'src/balance/balance.module';

@Module({
  providers: [OrderService, PaymentService, BalanceService],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order]), PaymentModule, BalanceModule],
  exports: [TypeOrmModule],
})
export class OrderModule {}
