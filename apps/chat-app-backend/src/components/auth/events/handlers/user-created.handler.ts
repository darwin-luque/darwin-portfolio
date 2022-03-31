import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../impl/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler {
  handle(event: UserCreatedEvent) {
    const { user } = event;

    console.log('New user created with email: ', user.email, ' created at: ', user.createdAt);
  }
}
