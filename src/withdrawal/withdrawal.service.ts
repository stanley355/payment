import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Withdrawal } from './withdrawal.entity';
import { CreateWithdrawalDto } from './dto/CreateWithdrawalDto';

@Injectable()
export class WithdrawalService {
  constructor(
    @InjectRepository(Withdrawal)
    private withdrawalRepo: Repository<Withdrawal>,
  ) {}

  async create(payload: CreateWithdrawalDto) {
    return this.withdrawalRepo.insert({
      balance: payload.balanceID,
      user_id: payload.userID,
      bank_name: payload.bankName,
      account_number: payload.accountNumber,
      account_owner_name: payload.accountOwnerName,
      amount: payload.amount
    });
  }
}
