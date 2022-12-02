import { Controller, Post, Body } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/CreateWithdrawalDto';
import { WithdrawalService } from './withdrawal.service';

@Controller('v2/withdrawal')
export class WithdrawalController {
  constructor(private withdrawalService: WithdrawalService) {}

  @Post()
  async createWithdrawal(
    @Body() createWithdrawalDto: CreateWithdrawalDto,
  ): Promise<any> {
    return await this.withdrawalService.create(createWithdrawalDto);
  }
}
