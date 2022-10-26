import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balance.entity';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
  imports: [TypeOrmModule.forFeature([Balance])],
  exports: [TypeOrmModule]
})
export class BalanceModule {}
