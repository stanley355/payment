import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  channel_id: number;

  @Column({ nullable: true })
  channel_name: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ nullable: true })
  bank_name: string;

  @Column({ nullable: true })
  account_number: string;
}
