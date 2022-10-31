import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';
import { CreateBalanceDto } from './dto/createBalanceDto';
import { UpdateBalanceDto } from './dto/updateBalanceDto';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
  ) {}

  async findAll(): Promise<Balance[]> {
    return this.balanceRepository.find();
  }

  async findOne(userID: string): Promise<Balance> {
    return await this.balanceRepository.findOneBy({ user_id: userID });
  }

  async create(payload: CreateBalanceDto) {
    return this.balanceRepository.insert({
      user_id: payload.userID,
      user_name: payload.userName,
    });
  }

  async updateBalanceChannel(payload: UpdateBalanceDto) {
    // executes UPDATE user SET payload WHERE id = id
    return this.balanceRepository.update(
      { user_id: payload.userID },
      {
        channel_id: payload.channelID,
        channel_name: payload.channelName,
      },
    );
  }

  async updateBalanceBankAccount(payload:UpdateBalanceDto ) {
    return this.balanceRepository.update(
      { user_id: payload.userID },
      {
        bank_name: payload.bankName,
        account_number: payload.bankAccount,
      },
    );
  }
}
