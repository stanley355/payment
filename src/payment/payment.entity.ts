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
  balance: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  expired_at: Date;

  @Column()
  channel_id: number;

  @Column('uuid')
  subscriber_id: string;

  @Column()
  subscription_duration: number;

  @Column()
  total_amount: number;

  @Column()
  merchant: string;

  @Column()
  merchant_order_id: string;

  @Column()
  merchant_payment_link: string;

  @Column({
    nullable: true,
    default: 'PENDING'
  })
  status: string;
}
