import { isRecord } from '@aks/core';
import { Entity } from './models';


export function isEntity(value: unknown): value is Entity {
  return isRecord(value) && !!value?.id;
}
