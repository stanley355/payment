import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Balance } from '../balance/balance.entity';

// TODO: Add created at
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Balance, (balance) => balance.id)
  channel_balance_id: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

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
