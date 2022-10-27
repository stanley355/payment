import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/createBalanceDto';

@Controller('v1/balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @UseGuards(JwtGuard)
  @Get()
  async viewAllBalance(): Promise<any> {
    return await this.balanceService.findAll();
  }

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
}
