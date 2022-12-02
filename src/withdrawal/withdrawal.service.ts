import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Withdrawal } from './withdrawal.entity';
import { CreateWithdrawalDto } from './dto/CreateWithdrawalDto';
import { BalanceService } from '../balance/balance.service';
import { UpdateWithdrawalDto } from './dto/UpdateWithdrawalDto';

@Injectable()
export class WithdrawalService {
  constructor(
    @InjectRepository(Withdrawal)
    private withdrawalRepo: Repository<Withdrawal>,

    private balanceService: BalanceService,
  ) {}

  async findOne(withdrawalID: string) {
    return await this.withdrawalRepo.findOneBy({ id: withdrawalID });
  }

  async findPendingWithdrawalByBlance(balanceID: string) {
    return await this.withdrawalRepo.findOneBy({
      balance: balanceID,
      status: 'IN_PROGRESS',
    });
  }

  async create(payload: CreateWithdrawalDto) {
    const pendingWithdrawal = await this.findPendingWithdrawalByBlance(
      payload.balanceID,
    );

    if (pendingWithdrawal) {
      throw new HttpException(
        'Hanya boleh ada 1 penarikan dalam progress',
        400,
      );
    }

    const balance = await this.balanceService.findOne(payload.userID);

    if (balance.amount < payload.amount) {
      throw new HttpException('Balance tidak mencukupi', 400);
    }

    return this.withdrawalRepo.insert({
      balance: payload.balanceID,
      user_id: payload.userID,
      bank_name: payload.bankName,
      account_number: payload.accountNumber,
      account_owner_name: payload.accountOwnerName,
      amount: payload.amount,
    });
  }

  async updateWithdrawal(payload: UpdateWithdrawalDto) {
    if (payload.status === 'SUCCESS') {
      const withdrawal = await this.findOne(payload.withdrawalID);
      const balance = await this.balanceService.findOne(withdrawal.balance);

      if (balance.amount < withdrawal.amount) {
        throw new HttpException('Balance tidak mencukupi', 400);
      }

      const newBalance = await this.balanceService.reduceBalanceAmount(
        withdrawal.balance,
        withdrawal.amount,
      );

      if (!newBalance.affected) {
        throw new HttpException('Internal server error', 500);
      }
    }

    return this.withdrawalRepo.update(
      { id: payload.withdrawalID },
      {
        status: payload.status,
        ...(payload.message && { message: payload.message }),
      },
    );
  }
  
}
