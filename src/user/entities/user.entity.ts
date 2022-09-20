import { Diff } from 'src/diff/entities/diff.entity';
import { Item } from 'src/items/entities/item.entity';
import { Planning } from 'src/planning/entities/planning.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Item, (item) => item.user_id)
  items: Item[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;

  // created and updated by relations
  @OneToMany(() => Item, (item) => item.created_by)
  itemCreatedBy: Item[];

  @OneToMany(() => Item, (item) => item.updated_by)
  itemUpdatedBy: Item[];

  @OneToMany(() => Planning, (planning) => planning.created_by)
  planningCreatedBy: Planning[];

  @OneToMany(() => Planning, (planning) => planning.updated_by)
  planningUpdatedBy: Planning[];

  @OneToMany(() => Diff, (diff) => diff.created_by)
  diffCreatedBy: Diff[];

  @OneToMany(() => Diff, (diff) => diff.updated_by)
  diffUpdatedBy: Diff[];

  @OneToMany(() => Transaction, (transaction) => transaction.created_by)
  transactionCreatedBy: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.updated_by)
  transactionUpdatedBy: Transaction[];
}
