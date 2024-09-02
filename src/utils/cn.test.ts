import { describe, expect, test } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  test('should return a single class when one class is provided', () => {
    expect(cn('class1')).toBe('class1');
  });

  test('should merge multiple classes into a single string', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  test('should ignore falsy values', () => {
    expect(cn('class1', false, 'class2', null, undefined, '')).toBe('class1 class2');
  });

  test('should merge Tailwind classes correctly', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500'); // 'bg-blue-500' should override 'bg-red-500'
  });

  test('should handle conditional class names', () => {
    const isActive = true;
    expect(cn('class1', isActive && 'active')).toBe('class1 active');
  });

  test('should handle arrays of class names', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  test('should return an empty string when no classes are provided', () => {
    expect(cn()).toBe('');
  });
});
