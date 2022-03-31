import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDateEntity } from '../../utils/shared/base-date.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

// Add a chat typeorm entity that extends BaseDateEntity
@Entity()
export class Chat extends BaseDateEntity {
  // Add uuid v4 as primary key
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  // Add members typeorm many to many relation with user
  @ManyToMany(() => User, (user) => user.chats, { eager: true })
  members: User[];

  // Add messages typeorm one to many relation with message
  @OneToMany(() => Message, (message) => message.chat, { eager: true })
  messages: Message[];
}
