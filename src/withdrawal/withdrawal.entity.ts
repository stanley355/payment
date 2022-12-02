import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
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

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
  })
  updated_at: Date;

  @Column('uuid')
  user_id: string;

  @Column()
  bank_name: string;

  @Column()
  account_number: string;

  @Column()
  account_owner_name: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ default: 'IN_PROGRESS' })
  status: string;

  @Column({ nullable: true })
  message: string;
}
