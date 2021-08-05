import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DEFAULT_CONFIGURATION, SETTINGS_CONFIG } from './tokens';
import { Settings, SettingsConfig } from './models';


@Injectable({ providedIn: 'root' })
export class SettingsService<T = Settings> {

  private readonly settings;

  constructor(@Inject(SETTINGS_CONFIG) private config: SettingsConfig,
              @Inject(DEFAULT_CONFIGURATION) private defaultConfiguration: T
  ) {
    this.settings = this.createStore();
    this.loadSettings();
  }

  /**
   * Saves a new configuration configuration.
   * The given {@param value} must match all the properties of the stored one.
   */
  setValue(value: T): void {
    // TODO: Check all keys
    const copy = { ...value };
    this.emitValue(copy);
    this.storeConfig(copy);
  }

  /**
   * Patches the current value based on the Partial {@param value}.
   * The given value will be merged with the current settings.
   */
  patchValue(value: Partial<T>): void {
    const update = { ...this.instant(), ...value };
    this.emitValue(update);
    this.storeConfig(update);
  }

  private emitValue(value: T): void {
    this.settings.next(value);
  }

  private storeConfig(value: T): void {
    sessionStorage.setItem(this.config.storageKey, JSON.stringify(value));
  }

  /**
   * Returns the current stored settings asynchronously
   */
  get(): Observable<T> {
    return this.settings.asObservable();
  }

  /**
   * Returns the current stored settings synchronously
   */
  instant(): T {
    return { ...this.settings.getValue() };
  }

  /**
   * Restores the settings to the default values and updates the stored configuration.
   */
  reset(): void {
    this.loadDefaultValue();
  }

  private createStore(): Subject<T> {
    return new BehaviorSubject<T>(undefined);
  }

  private loadSettings(): void {
    const storedConf = sessionStorage.getItem(this.config.storageKey);
    !storedConf ? this.loadDefaultValue()
                : this.settings.next(JSON.parse(storedConf));
  }

  private loadDefaultValue(): void {
    const value = { ...this.defaultConfiguration };
    this.settings.next(value);
    this.storeConfig(value);
  }
}
