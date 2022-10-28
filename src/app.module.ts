import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InvoiceModule } from './invoice/invoice.module';
import { BalanceModule } from './balance/balance.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { DbModule } from './db/db.module';

@Module({
  imports: [InvoiceModule, ConfigModule.forRoot(), BalanceModule, DbModule],
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
