import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor<D, T extends ClassConstructor<D>>
  implements NestInterceptor
{
  constructor(private dto: T) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler
  ): Observable<unknown> {
    return handler.handle().pipe(
      map((data: unknown) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
