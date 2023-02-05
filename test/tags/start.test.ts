import { Start } from '../../src/tags/start';

const valid = '#EXT-X-START:TIME-OFFSET=-10.7';

const noOffset = '#EXT-X-START:';

const withPrecise = '#EXT-X-START:TIME-OFFSET=-10.7,PRECISE=YES';

describe('Start', () => {
  it(`parses ${valid}`, () => {
    const start = new Start(valid);
    expect(start.timeOffset).toBe(-10.7);
    expect(start.precise).toBeUndefined();
  });

  it(`parses ${withPrecise}`, () => {
    const start = new Start(withPrecise);
    expect(start.timeOffset).toBe(-10.7);
    expect(start.precise).toBe('YES');
  });

  it(`doesn't parse ${noOffset}`, () => {
    expect(() => new Start(noOffset)).toThrow();
  });
});
