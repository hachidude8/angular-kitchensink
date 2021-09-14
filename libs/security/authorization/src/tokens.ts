import { InjectionToken } from '@angular/core';
import { ACL } from './models';


export const ACL_TOKEN = new InjectionToken<ACL>(
  'Authorization resource definition'
);
