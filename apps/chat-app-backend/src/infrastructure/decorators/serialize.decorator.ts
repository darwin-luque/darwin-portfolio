import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

export function Serialize<D>(dto: ClassConstructor<D>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
