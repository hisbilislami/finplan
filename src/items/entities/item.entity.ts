import { Planning } from 'src/planning/entities/planning.entity';
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

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.items, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user_id: User;

  @CreateDateColumn()
  create_at: Date;

  @ManyToOne(() => User, (user) => user.itemCreatedBy, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
  })
  created_by: User;

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  update_at: Date;
  @ManyToOne(() => User, (user) => user.itemUpdatedBy, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'updated_by',
    referencedColumnName: 'id',
  })
  updated_by: User;

  @DeleteDateColumn()
  delete_at: Date;

  @OneToMany(() => Planning, (planning) => planning.item_id)
  plannings: Planning[];
}
