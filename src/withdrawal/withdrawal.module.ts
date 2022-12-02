import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdrawal } from './withdrawal.entity';

@Module({
  providers: [WithdrawalService],
  controllers: [WithdrawalController],
  imports: [TypeOrmModule.forFeature([Withdrawal])],
  exports: [TypeOrmModule],
})
export class WithdrawalModule {}
