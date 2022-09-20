import { Diff } from 'src/diff/entities/diff.entity';
import { Item } from 'src/items/entities/item.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('plannings')
export class Planning {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.plannings, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'item_id',
    referencedColumnName: 'id',
  })
  item_id: Item;

  @Column({ type: 'numeric' })
  price: number;

  @Column()
  qty: number;

  @Column({ type: 'numeric' })
  subtotal_estimated_price: number;

  @Column({ type: 'date' })
  periode: Date;

  @Column()
  payment_type: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.planningCreatedBy, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
  })
  created_by: User;

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.planningUpdatedBy, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'updated_by',
    referencedColumnName: 'id',
  })
  updated_by: User;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Diff, (diff) => diff.planning_id)
  diffs: Diff[];

  @OneToMany(() => Transaction, (transaction) => transaction.planning_id)
  transactions: Transaction[];
}
