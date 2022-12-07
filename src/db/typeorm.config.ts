import { DataSource } from 'typeorm';
import { Balance } from '../balance/balance.entity';
import { Payment } from '../payment/payment.entity';
import { Withdrawal } from '../withdrawal/withdrawal.entity';
import { Order } from '../order/order.entity';
import { balance1666751754264 } from '../../migrations/1666751754264-balance';
import { payment1667265965008 } from '../../migrations/1667265965008-payment';
import { payment1669536373133 } from '../../migrations/1669536373133-payment';
import { payment1669625502063 } from '../../migrations/1669625502063-payment';
import { withdrawal1669884382358 } from '../../migrations/1669884382358-withdrawal';
import { withdrawal1669946007824 } from '../../migrations/1669946007824-withdrawal';
import { balance1670142157831 } from '../../migrations/1670142157831-balance';
import { order1670142990129 } from '../../migrations/1670142990129-order';
import { order1670206366157 } from '../../migrations/1670206366157-order';
import { payment1670402314670 } from '../../migrations/1670402314670-payment';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Balance, Payment, Withdrawal, Order],
  migrations: [
    balance1666751754264,
    payment1667265965008,
    payment1669536373133,
    payment1669625502063,
    withdrawal1669884382358,
    withdrawal1669946007824,
    balance1670142157831,
    order1670142990129,
    order1670206366157,
    payment1670402314670
  ],
});
