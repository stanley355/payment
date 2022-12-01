import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BalanceModule } from './balance/balance.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { DbModule } from './db/db.module';
import { PaymentModule } from './payment/payment.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';

@Module({
  imports: [ConfigModule.forRoot(), BalanceModule, DbModule, PaymentModule, WithdrawalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/v1/*');
  }
}
