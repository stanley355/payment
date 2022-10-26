import { DataSource } from 'typeorm';
import { Balance } from '../balance/balance.entity';
import { balance1666751754264 } from '../../migrations/1666751754264-balance';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Balance],
  migrations: [balance1666751754264]
});
