import { Controller, Get, Post, Body, Query, Put } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/createBalanceDto';
import { UpdateBalanceDto } from './dto/updateBalanceDto';

@Controller('/balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get()
  async viewBalance(@Query('userID') userID: string): Promise<any> {
    return await this.balanceService.findOne(userID);
  }

  @Post()
  async createBalance(
    @Body() createBalanceDto: CreateBalanceDto,
  ): Promise<any> {
    const balance = await this.balanceService.findOne(createBalanceDto.userID);

    if (balance && balance.id) {
      return balance;
    }

    return await this.balanceService.create(createBalanceDto);
  }

  @Put('/channel')
  async updateBalanceChannel(
    @Body() updateBalanceDto: UpdateBalanceDto,
  ): Promise<any> {
    return await this.balanceService.updateBalanceChannel(updateBalanceDto);
  }


  @Put('/bank')
  async updateBalanceBankAccount(
    @Body() updateBalanceDto: UpdateBalanceDto,
  ): Promise<any> {
    return await this.balanceService.updateBalanceBankAccount(updateBalanceDto);
  }

}
