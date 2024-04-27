import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../post/models/post.model';

@Entity({ name: 'users' })
@Index(['firstname', 'lastname', 'username'])
export class User {
  @PrimaryColumn()
  id?: string;

  @Column({ length: 500 })
  firstname: string;

  @Column({ length: 500 })
  lastname: string;

  @Column({ default: null, nullable: true })
  username: string;

  @Column({ type: 'text', select: false, default: null, nullable: true })
  password: string;

  @Column({ nullable: true, default: null })
  phone: string;

  @Column({ default: null })
  imageUrl: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'boolean', default: false })
  isDelete: boolean;

  @Column({ nullable: true })
  otp: string;

  @Column({ default: false })
  isNewUser: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
