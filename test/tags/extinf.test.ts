import { Extinf } from '../../src/tags/extinf';

const withInt = '#EXTINF:3,';

const withFloat = '#EXTINF:1.3,';

const intWithTitle = '#EXTINF:3,Some Title :)';

const floatWithTitle = '#EXTINF:1.3,Some Title :)';

const missingComma = '#EXTINF:3';

const badDuration = '#EXTINF:-3';

describe('Extinf', () => {
  it(`parses "${withInt}"`, () => {
    expect(() => {
      new Extinf(withInt);
    }).not.toThrow();
    const instance = new Extinf(withInt);
    expect(instance.title).toBeUndefined();
    expect(instance.duration).toBe(3);
  });

  it(`parses "${withFloat}"`, () => {
    expect(() => {
      new Extinf(withFloat);
    }).not.toThrow();
    const instance = new Extinf(withFloat);
    expect(instance.title).toBeUndefined();
    expect(instance.duration).toBe(1.3);
  });

  it(`parses "${intWithTitle}"`, () => {
    expect(() => {
      new Extinf(intWithTitle);
    }).not.toThrow();
    const instance = new Extinf(intWithTitle);
    expect(instance.title).toBe('Some Title :)');
    expect(instance.duration).toBe(3);
  });

  it(`parses "${floatWithTitle}"`, () => {
    expect(() => {
      new Extinf(floatWithTitle);
    }).not.toThrow();
    const instance = new Extinf(floatWithTitle);
    expect(instance.title).toBe('Some Title :)');
    expect(instance.duration).toBe(1.3);
  });

  it(`doesn't parse "${missingComma}"`, () => {
    expect(() => {
      new Extinf(missingComma);
    }).toThrow();
  });

  it(`doesn't parse "${badDuration}"`, () => {
    expect(() => {
      new Extinf(badDuration);
    }).toThrow();
  });
});
