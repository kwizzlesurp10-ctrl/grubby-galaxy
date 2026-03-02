import { describe, it, expect } from 'vitest';
import { trim, toUiAmount } from '../utils';

describe('trim', () => {
  it('trims slashes from both ends', () => {
    expect(trim('/foo/bar/', '/')).toBe('foo/bar');
  });

  it('trims a single character from both ends', () => {
    expect(trim('--hello--', '-')).toBe('hello');
  });

  it('returns the string unchanged when no char matches', () => {
    expect(trim('hello', '/')).toBe('hello');
  });

  it('returns empty string for empty input', () => {
    expect(trim('')).toBe('');
  });

  it('handles undefined input (default empty string)', () => {
    expect(trim(undefined)).toBe('');
  });

  it('handles string with only trim characters', () => {
    expect(trim('///', '/')).toBe('');
  });
});

describe('toUiAmount', () => {
  it('returns 0 for falsy input', () => {
    expect(toUiAmount(0)).toBe(0);
  });

  it('formats numbers below 1000 as integers', () => {
    expect(toUiAmount(999)).toBe('999');
    expect(toUiAmount(1)).toBe('1');
  });

  it('formats thousands with K suffix', () => {
    expect(toUiAmount(1000)).toBe('1K');
    expect(toUiAmount(1500)).toBe('1.5K');
    expect(toUiAmount(999999)).toBe('1000K');
  });

  it('formats millions with M suffix', () => {
    expect(toUiAmount(1000000)).toBe('1M');
    expect(toUiAmount(1500000)).toBe('1.5M');
  });

  it('formats billions with B suffix', () => {
    expect(toUiAmount(1000000000)).toBe('1B');
    expect(toUiAmount(1500000000)).toBe('1.5B');
  });

  it('omits decimal when it is a whole number in K range', () => {
    expect(toUiAmount(2000)).toBe('2K');
  });

  it('omits decimal when it is a whole number in M range', () => {
    expect(toUiAmount(2000000)).toBe('2M');
  });

  it('omits decimal when it is a whole number in B range', () => {
    expect(toUiAmount(2000000000)).toBe('2B');
  });
});
