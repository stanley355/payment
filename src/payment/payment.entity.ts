import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Balance } from '../balance/balance.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Balance, (balance) => balance.id)
  channel_balance_id: string;

  @Column()
  channel_id: number;

  @Column()
  channel_name: string;

  @Column('uuid')
  subscriber_id: string;

  @Column()
  subscriber_name: string;

  @Column()
  subscription_duration: number;

  @Column()
  total_amount: number;

  @Column()
  channel_net_income: number;

  @Column()
  platform_fee: number;
}
