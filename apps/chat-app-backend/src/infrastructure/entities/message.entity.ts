import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDateEntity } from '../../utils/shared/base-date.entity';
import { Chat } from './chat.entity';
import { User } from './user.entity';

// Add a message entity that extends BaseDateEntity
@Entity()
export class Message extends BaseDateEntity {
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
}
