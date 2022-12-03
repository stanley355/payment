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

  async findAllWithdrawalByUser(userID: string) {
    return await this.withdrawalRepo.find({
      where: {
        user_id: userID
      },
      order: {
        created_at: 'ASC',
      },
    });
  }

  async findPendingWithdrawalByUser(userID: string) {
    return await this.withdrawalRepo.findOneBy({
      user_id: userID,
      status: 'IN_PROGRESS',
    });
  }

  async findAllOngoingWithdrawal(): Promise<Withdrawal[]> {
    return await this.withdrawalRepo.find({
      where: {
        status: 'IN_PROGRESS',
      },
      order: {
        created_at: 'ASC',
      },
    });
  }

  async create(payload: CreateWithdrawalDto) {
    const pendingWithdrawal = await this.findPendingWithdrawalByUser(
      payload.userID,
    );

    if (pendingWithdrawal && pendingWithdrawal.id) {
      throw new HttpException(
        'Hanya boleh ada 1 penarikan dalam progress',
        400,
      );
    }

    const balance = await this.balanceService.findOne(payload.userID);

    if (balance && balance.id) {
      if (balance.amount < payload.amount) {
        throw new HttpException('Balance tidak mencukupi', 400);
      }

      return this.withdrawalRepo.insert({
        balance: balance.id,
        user_id: payload.userID,
        bank_name: payload.bankName,
        account_number: payload.accountNumber,
        account_owner_name: payload.accountOwnerName,
        amount: payload.amount,
      });
    } else {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async update(payload: UpdateWithdrawalDto) {
    const withdrawal = await this.findOne(payload.withdrawalID);

    if (payload.status === 'SUCCESS') {
      const balance = await this.balanceService.findOne(withdrawal.balance);

      if (balance.amount < withdrawal.amount) {
        throw new HttpException('Balance tidak mencukupi', 400);
      }

      const newBalance = await this.balanceService.reduceBalanceAmount(
        withdrawal.balance,
        withdrawal.amount,
      );

      if (!newBalance.id) {
        throw new HttpException('Internal server error', 500);
      }
    }

    withdrawal.status = payload.status;
    if (payload.message) {
      withdrawal.message = payload.message;
    }

    return await this.withdrawalRepo.save(withdrawal);
  }
}
