import { Controller, Post, Put, Body, HttpException } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/CreateWithdrawalDto';
import { UpdateWithdrawalDto } from './dto/UpdateWithdrawalDto';
import { WithdrawalService } from './withdrawal.service';

@Controller('v2/withdrawal')
export class WithdrawalController {
  constructor(private withdrawalService: WithdrawalService) {}

  @Post()
  async createWithdrawal(
    @Body() createWithdrawalDto: CreateWithdrawalDto,
  ): Promise<any> {
    const validBankName = ['BCA', 'GO_PAY'];
    if (!validBankName.includes(createWithdrawalDto.bankName)) {
      throw new HttpException('Bank Name should be either BCA or GO_PAY', 400);
    }

    return await this.withdrawalService.create(createWithdrawalDto);
  }

  @Put()
  async updateWithdrawal(
    @Body() updateWithdrawalDto: UpdateWithdrawalDto,
  ): Promise<any> {
    const validStatus = ['SUCCESS', 'REJECTED'];

    if (!validStatus.includes(updateWithdrawalDto.status)) {
      throw new HttpException(
        'Status should be either SUCCESS or REJECTED',
        400,
      );
    }

    return await this.withdrawalService.update(updateWithdrawalDto);
  }
}
