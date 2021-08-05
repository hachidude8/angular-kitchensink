import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { DefaultSettingsConfig } from './constants';
import { SETTINGS_CONFIG } from './tokens';


@NgModule()
export class SettingsModule {
  static forRoot(
    configurationProvider: Provider,
    settingsConfigProvider?: Provider
  ): ModuleWithProviders<SettingsModule> {
    const settings: Provider = settingsConfigProvider || { provide: SETTINGS_CONFIG, useValue: DefaultSettingsConfig };
    return {
      ngModule: SettingsModule,
      providers: [configurationProvider, settings]
    }
  }
}
