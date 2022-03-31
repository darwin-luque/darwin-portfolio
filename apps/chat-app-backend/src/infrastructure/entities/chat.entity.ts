import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

// Add a chat typeorm entity that extends BaseDateEntity
@Entity()
export class Chat {
  // Add uuid v4 as primary key
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  // Add members typeorm many to many relation with user
  @ManyToMany(() => User, (user) => user.chats, { eager: true })
  members: User[];

  // Add messages typeorm one to many relation with message
  @OneToMany(() => Message, (message) => message.chat, { eager: true })
  messages: Message[];

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
