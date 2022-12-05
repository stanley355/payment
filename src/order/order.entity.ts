import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    nullable: true
  })
  expired_at: Date;

  @Column()
  channel_id: number;

  @Column('uuid')
  subscriber_id: string;

  @Column()
  subscription_duration: number;

  @Column({ default: 0 })
  amount: number;

  @Column({ nullable: true })
  merchant: string;

  @Column({ nullable: true })
  merchant_order_id: string;

  @Column({ nullable: true })
  merchant_payment_link: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({nullable: true})
  merchant_va_number: string;
}
