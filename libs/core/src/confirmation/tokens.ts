import { InjectionToken } from '@angular/core';
import { ConfirmDetails } from './models';


export const CONFIRMATION_MESSAGE = new InjectionToken<ConfirmDetails>(
  'Default confirmation message value'
)
