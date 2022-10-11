import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/createInvoiceDto';
const Xendit = require('xendit-node');

@Injectable()
export class InvoiceService {
  async create(payload: CreateInvoiceDto): Promise<any> {
    
    const x = new Xendit({
      secretKey:
        'xnd_public_development_YvPpAdUI5nQhtxQ1n3SznBFLyysQjMnpIDjnFqI0OQ2BZAdvr7SDAgtHHsDDvuSK',
    });
    const { Invoice } = x;
    const invoiceSpecificOptions = {};
    const i = new Invoice(invoiceSpecificOptions);

    const resp = await i.createInvoice({ ...payload, shouldSendEmail: true });

    return resp;
  }
}
