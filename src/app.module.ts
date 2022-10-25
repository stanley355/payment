import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InvoiceModule } from './invoice/invoice.module';
import { BalanceController } from './balance/balance.controller';
import { BalanceModule } from './balance/balance.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [InvoiceModule, ConfigModule.forRoot(), BalanceModule, DbModule],
  controllers: [AppController, BalanceController],
  providers: [AppService],
})
export class AppModule {}
