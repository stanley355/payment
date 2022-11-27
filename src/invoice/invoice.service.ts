import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/createInvoiceDto';

@Injectable()
export class InvoiceService {

  async create(payload: CreateInvoiceDto): Promise<any> {
  // TODO: Connect with Midtrans API
  }

  async expire(invoiceID: string): Promise<any> {

  // TODO: Connect with Midtrans API
  }

  async view(invoiceID: string) : Promise<any> {

  // TODO: Connect with Midtrans API
  }
}
