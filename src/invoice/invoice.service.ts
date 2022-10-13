import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/createInvoiceDto';
const Xendit = require('xendit-node');

@Injectable()
export class InvoiceService {
  initXenditInvoice(): any {
    const x = new Xendit({
      secretKey: process.env.XENDIT_KEY,
    });

    const { Invoice } = x;
    const invoiceSpecificOptions = {};
    return new Invoice(invoiceSpecificOptions);
  }

  async create(payload: CreateInvoiceDto): Promise<any> {
    const xenditInvoice = this.initXenditInvoice();
    const resp = await xenditInvoice.createInvoice({ ...payload, shouldSendEmail: true });

    return resp;
  }

  async expire(invoiceID: string): Promise<any> {
    const xenditInvoice = this.initXenditInvoice();
    const resp = await xenditInvoice.expireInvoice({ invoiceID });

    return resp;
  }

  async view(invoiceID: string) : Promise<any> {
    const xenditInvoice = this.initXenditInvoice();
    const resp = await xenditInvoice.getInvoice({ invoiceID });

    return resp;
  }
}
