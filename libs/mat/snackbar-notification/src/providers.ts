import { Provider } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';


export const SnackbarNotificationConfig: Provider = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    politeness: 'assertive',
    duration: 10_000,
  }
};
