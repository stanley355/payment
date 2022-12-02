import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Withdrawal } from './withdrawal.entity';
import { CreateWithdrawalDto } from './dto/CreateWithdrawalDto';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class WithdrawalService {
  constructor(
    @InjectRepository(Withdrawal)
    private withdrawalRepo: Repository<Withdrawal>,

    private balanceService: BalanceService,
  ) {}

  async create(payload: CreateWithdrawalDto) {
    const balance = await this.balanceService.findOne(payload.userID);

    if (balance.amount < payload.amount) {
      throw new HttpException('Balance tidak mencukupi', 400);
    } else {
      return this.withdrawalRepo.insert({
        balance: payload.balanceID,
        user_id: payload.userID,
        bank_name: payload.bankName,
        account_number: payload.accountNumber,
        account_owner_name: payload.accountOwnerName,
        amount: payload.amount,
      });
    }
  }

  // async updatePaidPayment(payload: UpdatePaidPaymentDto) {
  //   return this.paymentReposistory.update(
  //     { id: payload.paymentID },
  //     {
  //       ...(payload.merchantOrderID && {
  //         merchant_order_id: payload.merchantOrderID,
  //       }),
  //       ...(payload.merchantPaymentLink && {
  //         merchant_payment_link: payload.merchantPaymentLink,
  //       }),
  //       status: 'PAID',
  //     },
  //   );
  // }
}
