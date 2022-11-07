import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';
import { CreateBalanceDto } from './dto/createBalanceDto';
import { UpdateBalanceDto } from './dto/updateBalanceDto';

const Xendit = require('xendit-node');

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

  async updateBalanceBankAccount(payload: UpdateBalanceDto) {
    return this.balanceRepository.update(
      { user_id: payload.userID },
      {
        bank_name: payload.bankName,
        account_number: payload.bankAccount,
      },
    );
  }

  async updateBalanceAmount(balanceID: string, profitAmount: number) {
    const balance = await this.balanceRepository.findOneBy({ id: balanceID });

    return this.balanceRepository.update(
      { id: balanceID },
      {
        amount: balance.amount + profitAmount,
      },
    );
  }

  initXenditBalance(): any {
    const x = new Xendit({
      secretKey: process.env.XENDIT_KEY,
    });

    const { Balance } = x;
    const balanceOptions = {};
    return new Balance(balanceOptions);
  }

  initXenditDisbursement(): any {
    const x = new Xendit({
      secretKey: process.env.XENDIT_KEY,
    });

    const { Disbursement } = x;
    const disbursementOptions = {};
    return new Disbursement(disbursementOptions);
  }

  async withdrawBalance(payload: UpdateBalanceDto) {
    const balance = await this.balanceRepository.findOneBy({ user_id: payload.userID });

    if (balance.amount < payload.amount) {
      throw new HttpException('Insufficient Balance', 400);
    }

    const xenditBalance = await this.initXenditBalance().getBalance();
    
    if (xenditBalance < payload.amount) {
      console.error('Xendit Cash insufficient Balance');
      throw new HttpException('Internal Server Error', 500);
    }

    const xenditDisbursement = this.initXenditDisbursement();
    const disbursement = await xenditDisbursement.create({
      externalID: `Withdrawal-${payload.userID}-${new Date().toISOString()}`,
      amount: payload.amount,
      bankCode: payload.bankName,
      accountHolderName: payload.accountHolderName.toUpperCase(),
      accountNumber: payload.bankAccount,
      description: `${payload.userName} : Rp ${
        payload.amount
      } withdrawal on ${new Date().toString()} `,
    });

    if (disbursement && disbursement.id) {
      return this.balanceRepository.update(
        { user_id: payload.userID },
        {
          amount: balance.amount - payload.amount,
        },
      );
    } else {
      throw new HttpException('Xendit Internal Server Error', 500);
    }
  }
}
