import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/models/user.model';

@Entity({ name: 'post' })
export class Post {
  @PrimaryColumn()
  id?: string;

  @JoinColumn()
  @ManyToOne(() => User)
  user: User;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
