import { ComponentType } from '@angular/cdk/overlay';
import { TemplateRef } from '@angular/core';


export interface ConfirmDetails {
  title: string;
  subtitle?: string;
}

export type ConfirmContents = ConfirmDetails | TemplateRef<unknown> | ComponentType<unknown>;
