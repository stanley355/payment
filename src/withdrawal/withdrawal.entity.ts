import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Balance } from '../balance/balance.entity';

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Balance, (balance) => balance.id)
  balance: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  created_at: Date;

  @Column('uuid')
  user_id: string;

  @Column()
  bank_name: string;

  @Column()
  account_number: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ default: 'IN_PROGRESS' })
  status: string;

  @Column({ nullable: true })
  message: string;
}
