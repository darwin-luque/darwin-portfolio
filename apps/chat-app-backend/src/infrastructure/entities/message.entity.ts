import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from './user.entity';

// Add a message entity that extends BaseDateEntity
@Entity()
export class Message {
  // Add uuid v4 as primary key
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  // Add chat typeorm many to one relation with chat
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat?: Chat;

  // Add user typeorm many to one relation with user
  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  user: User;

  // Add message typeorm column
  @Column({ name: 'message' })
  message: string;

  // Add createdAt typeorm column
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Add updatedAt typeorm column
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Add deletedAt typeorm column
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
