import { Planning } from 'src/planning/entities/planning.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Diff {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Planning, (planning) => planning.diffs, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'planning_id',
    referencedColumnName: 'id',
  })
  planning_id: Planning;

  @Column({ type: 'numeric' })
  balance: number;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.diffCreatedBy, {
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

  @ManyToOne(() => User, (user) => user.diffUpdatedBy, {
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
}
