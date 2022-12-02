import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdrawal } from './withdrawal.entity';
import { BalanceModule } from '../balance/balance.module';
import { BalanceService } from '../balance/balance.service';

@Module({
  providers: [WithdrawalService, BalanceService],
  controllers: [WithdrawalController],
  imports: [TypeOrmModule.forFeature([Withdrawal]), BalanceModule],
  exports: [TypeOrmModule],
})
export class WithdrawalModule {}
