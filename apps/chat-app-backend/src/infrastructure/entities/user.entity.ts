import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseDateEntity } from '../../utils/shared/base-date.entity';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

// Create typeorm user entity
@Entity()
export class User extends BaseDateEntity {
  // Add uuid v4 as primary key
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  // Add username typeorm column
  @Column({ name: 'username' })
  username: string;

  // Add password typeorm column
  @Column({ name: 'password' })
  password: string;

  // Add email typeorm column
  @Column({ name: 'email' })
  email: string;

  // Add chat typeorm many to many relation with chat
  @ManyToMany(() => Chat, (chat) => chat.members)
  chats?: Chat[];

  // Add messages typeorm one to many relation with message
  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];
}
