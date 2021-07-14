import { APP_INITIALIZER, Provider } from '@angular/core';


export function StartupFactory(): () => Promise<void> {
  return () => new Promise(resolve => {
    console.debug('Mock application initialization');
    setTimeout(() => resolve(), 1_000);
  });
}

export const AppStartup: Provider = {
  provide: APP_INITIALIZER,
  useFactory: StartupFactory,
  multi: true
};

