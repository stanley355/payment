import { Controller, Get, Post, Body } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/createBalanceDto';

@Controller('v1/balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get()
  async viewBlance(): Promise<any> {
    return await this.balanceService.findAll();
  }

  @Post()
  async createBalance(
    @Body() createBalanceDto: CreateBalanceDto,
  ): Promise<any> {
    return await this.balanceService.create(createBalanceDto);
  }
}
