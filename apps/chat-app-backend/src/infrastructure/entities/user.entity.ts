import { AggregateRoot } from '@nestjs/cqrs';
import { compare } from 'bcryptjs';
import {
  AfterInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserCreatedEvent } from '../../components/auth/events/impl/user-created.event';
import { Token } from '../../utils/types';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

// Create typeorm user entity
@Entity()
export class User extends AggregateRoot {
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

  @Column({ name: 'token', type: 'simple-json', nullable: true })
  token?: Token;

  // Add chat typeorm many to many relation with chat
  @ManyToMany(() => Chat, (chat) => chat.members)
  chats?: Chat[];

  // Add messages typeorm one to many relation with message
  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];

  // Add createdAt typeorm column
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Add updatedAt typeorm column
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Add deletedAt typeorm column
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @AfterInsert()
  created() {
    this.apply(new UserCreatedEvent(this));
  }

  // Add comparePassword method to compare password
  async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
