import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';
import { CreateBalanceDto } from './dto/createBalanceDto';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
  ) {}

  async findAll(): Promise<Balance[]> {
    return this.balanceRepository.find();
  }

  async create(payload:CreateBalanceDto) {
    return this.balanceRepository.insert({
      user_id: payload.userID,
      user_name: payload.userName
    })
  }
}
