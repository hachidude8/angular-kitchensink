// Module configuration
export interface SettingsConfig {
  storageKey: string;
}

// Settings value
export type Settings = Record<string | number, unknown>;
