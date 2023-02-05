import { Byterange } from '../../src/tags/byterange';

const withoutStart = '#EXT-X-BYTERANGE:10';

const withStart = '#EXT-X-BYTERANGE:10@5';

const negativeLength = '#EXT-X-BYTERANGE:-10';

const negativeStart = '#EXT-X-BYTERANGE:10@-5';

const floatLength = '#EXT-X-BYTERANGE:10.5';

const floatStart = '#EXT-X-BYTERANGE:10@5.5';

describe('Byterange', () => {
  it(`parses ${withoutStart}`, () => {
    const byterange = new Byterange(withoutStart);
    expect(byterange.length).toBe(10);
    expect(byterange.start).toBeUndefined();
  });

  it(`parses ${withStart}`, () => {
    const byterange = new Byterange(withStart);
    expect(byterange.length).toBe(10);
    expect(byterange.start).toBe(5);
  });

  it(`doesn't parse ${negativeLength}`, () => {
    expect(() => new Byterange(negativeLength)).toThrow();
  });

  it(`doesn't parse ${negativeStart}`, () => {
    expect(() => new Byterange(negativeStart)).toThrow();
  });

  it(`doesn't parse ${floatLength}`, () => {
    expect(() => new Byterange(floatLength)).toThrow();
  });

  it(`doesn't parse ${floatStart}`, () => {
    expect(() => new Byterange(floatStart)).toThrow();
  });
});
