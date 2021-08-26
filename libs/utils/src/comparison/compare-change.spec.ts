import { SimpleChange } from '@angular/core';
import { hasChanges } from './compare-change';


describe('hasChanges', () => {

  it('Should detect a change', () => {
    const change = new SimpleChange('previous', 'current', false);
    expect(hasChanges(change)).toBeTruthy();
  });

  it('Should not detect a change', () => {
    const change = new SimpleChange('previous', 'previous', false);
    expect(hasChanges(change)).toBeFalsy();
  });

  it('Should detect not detect NULL as a change', () => {
    expect(hasChanges(null)).toBeFalsy();
  });

  it('Should compare NULL values', () => {
    const change = new SimpleChange(null, 'previous', false);
    expect(hasChanges(change)).toBeTruthy();
  });

  it('Should skip first change', () => {
    const change = new SimpleChange(null, 'previous', true);
    expect(hasChanges(change, { skipFirstChange: true })).toBeFalsy();
  });

});
