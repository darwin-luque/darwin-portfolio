import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { LogUserCommand } from '../commands/impl/log-user.command';
import { UserCreatedEvent } from '../events/impl/user-created.event';

@Injectable()
export class CreateUserSaga {
  @Saga()
  createUser = (events$: Observable<unknown>) => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map((event: UserCreatedEvent) => new LogUserCommand(event.user))
    );
  };
}
