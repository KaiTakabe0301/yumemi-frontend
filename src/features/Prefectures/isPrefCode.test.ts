import { describe, expect } from 'vitest';

import { isPrefCode } from './isPrefCode';

describe('isPrefCode', () => {
  test('returns true for valid prefecture codes', () => {
    expect(isPrefCode('1')).toBe(true);
    expect(isPrefCode('47')).toBe(true);
    expect(isPrefCode('23')).toBe(true);
  });

  test('returns false for invalid prefecture codes', () => {
    expect(isPrefCode('0')).toBe(false);
    expect(isPrefCode('48')).toBe(false);
    expect(isPrefCode('100')).toBe(false);
    expect(isPrefCode('abc')).toBe(false);
  });

  test('returns false for empty string or non-numeric input', () => {
    expect(isPrefCode('')).toBe(false);
    expect(isPrefCode(' ')).toBe(false);
    expect(isPrefCode('abc')).toBe(false);
  });

  test('returns false for leading zeros', () => {
    expect(isPrefCode('01')).toBe(false);
    expect(isPrefCode('007')).toBe(false);
  });
});
