import { ComponentType } from '@angular/cdk/overlay';
import { TemplateRef } from '@angular/core';
import { Action } from './constants';


export interface ConfirmDetails {
  title: string;
  subtitle?: string;
}


export type ConfirmContents = ConfirmDetails | TemplateRef<unknown> | ComponentType<unknown>;


export class ActionResult {
  constructor(private readonly result: Action) {
  }

  isConfirmed(): boolean {
    return this.result === Action.CONFIRM;
  }

  isRejected(): boolean {
    return this.result === Action.REJECT;
  }

  isCancelled(): boolean {
    return this.result === Action.CANCEL;
  }
}

