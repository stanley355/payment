import { Controller, Get } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('v1/balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get()
  async viewInvoice(): Promise<any> {
    return await this.balanceService.findAll();
  }
}
