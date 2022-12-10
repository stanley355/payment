import { HttpException, Injectable } from '@nestjs/common';
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

  async findOne(userID: string) {
    return await this.balanceRepository.findOneBy({ user_id: userID });
  }

  async findOneByChannel(channelID: number): Promise<Balance> {
    return await this.balanceRepository.findOneBy({ channel_id: channelID });
  }

  async create(payload: CreateBalanceDto) {
    return this.balanceRepository.insert({
      user_id: payload.userID,
    });
  }

  async updateBalanceChannel(payload: UpdateBalanceChannelDto) {
    const balance = await this.findOne(payload.userID);
    balance.channel_id = payload.channelID;
    return await this.balanceRepository.save(balance);
  }

  async increaseBalanceAmount(balanceID: string, amount: number) {
    const balance = await this.balanceRepository.findOneBy({ id: balanceID });
    balance.amount = balance.amount + amount;
    return this.balanceRepository.save(balance);
  }

  async reduceBalanceAmount(balanceID: string, amount: number) {
    const balance = await this.balanceRepository.findOneBy({ id: balanceID });
    balance.amount = balance.amount - amount;
    return this.balanceRepository.save(balance);
  }
}
