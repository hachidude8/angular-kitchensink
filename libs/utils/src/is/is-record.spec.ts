import { isRecord } from './is-record';


describe('isRecord', () => {
  it('An object should be a record', () => {
    const value = {
      question: 'the answer to the ultimate question of life, the universe, and everything.',
      answer: 42
    };
    expect(isRecord(value)).toBeTruthy()
  });

  it('Empty object should be a record', () => {
    const value = {};
    expect(isRecord(value)).toBeTruthy();
  });

  it('NULL should not be a record', () => {
    expect(isRecord(null)).toBeFalsy();
  });

  it('Undefined should not be a record', () => {
    expect(isRecord(undefined)).toBeFalsy();
  });

  it('String should not be a record', () => {
    const value = 'Just a normal string';
    expect(isRecord(value)).toBeFalsy();
  });

  it('Empty string should not be a record', () => {
    const value = '';
    expect(isRecord(value)).toBeFalsy();
  });

  it('Number should not be a record', () => {
    const value = 1.5;
    expect(isRecord(value)).toBeFalsy();
  });

  it('Boolean should not be a record', () => {
    const value = true;
    expect(isRecord(value)).toBeFalsy();
  });

  it('Function should not be a record', () => {
    const fn = () => undefined;
    expect(isRecord(fn)).toBeFalsy();
  });

});
