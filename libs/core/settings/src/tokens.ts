import { InjectionToken } from '@angular/core';
import { SettingsConfig, Settings } from './models';


export const DEFAULT_CONFIGURATION = new InjectionToken<Settings>(
  'Default settings'
);

export const SETTINGS_CONFIG = new InjectionToken<SettingsConfig>(
  'Module configuration'
)
