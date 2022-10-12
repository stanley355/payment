import { Controller, Post, Body, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/createInvoiceDto';

@Controller('v1/invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Post()
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<any> {
    return await this.invoiceService.create(createInvoiceDto);
  }

  @Post('/expire')
  async expireInvoice(
    @Query('invoiceID') invoiceID: string ,
  ): Promise<any> {
    return await this.invoiceService.expire(invoiceID);
  }
}
