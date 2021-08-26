import { SimpleChange } from '@angular/core';


export interface HasChangedConfig {
  /**
   * Flags if should skip
   */
  skipFirstChange: boolean;
  /**
   * Compares the given values
   */
  compareFn: (prev, current) => boolean;
}

const HAS_CHANGED_CONFIG: HasChangedConfig = {
  skipFirstChange: false,
  compareFn: (prev, current) => prev !== current
};

/**
 * Null safe check if there are any changes in of the value in the given {@param change}
 *
 * @param change Values to compare
 * @param configuration Configuration
 * @return true if there was a change detected false if there is no change detected
 */
export function hasChanges(change: SimpleChange, configuration: Partial<HasChangedConfig> = {}): boolean {
  const config = { ...HAS_CHANGED_CONFIG, ...configuration };
  if (!change || (config.skipFirstChange && change.isFirstChange())) {
    return false;
  }
  return config.compareFn(change.previousValue, change.currentValue);
}
