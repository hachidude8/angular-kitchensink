import { isRecord } from '@aks/utils';
import { Entity } from './entity.model';


export function isEntity(value: unknown): value is Entity {
  return isRecord(value) && !!value?.id;
}
