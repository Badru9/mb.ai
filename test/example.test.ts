import { describe, test, expect } from 'bun:test';

// Unit test untuk fungsi sederhana
describe('Basic Arithmetic', () => {
  test('addition: 1 + 1 equals 2', () => {
    expect(1 + 1).toBe(2);
  });

  test('multiplication: 3 * 4 equals 12', () => {
    expect(3 * 4).toBe(12);
  });
});

// Test untuk objek
describe('Object Equality', () => {
  test('deep equality check for objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    expect(obj1).toEqual(obj2);
  });

  test('array equality check', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });
});

// Asynchronous test
describe('Async Operations', () => {
  test('async/await test', async () => {
    const result = await Promise.resolve('async result');
    expect(result).toBe('async result');
  });

  test('promise resolves correctly', async () => {
    const fetchData = () => Promise.resolve({ status: 'success' });
    const data = await fetchData();
    expect(data.status).toBe('success');
  });
});

// String tests
describe('String Operations', () => {
  test('string contains substring', () => {
    expect('Hello World').toContain('World');
  });

  test('string matches regex', () => {
    expect('test@example.com').toMatch(/^[\w-]+@[\w-]+\.\w+$/);
  });
});
