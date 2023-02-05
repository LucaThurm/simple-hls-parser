import { DiscontinuitySequence } from '../../src/tags/discontinuity-sequence';
const positive = '#EXT-X-DISCONTINUITY-SEQUENCE:1';

const negative = '#EXT-X-DISCONTINUITY-SEQUENCE:-1';

const float = '#EXT-X-DISCONTINUITY-SEQUENCE:1.3';

const zero = '#EXT-X-DISCONTINUITY-SEQUENCE:0';

describe('DiscontinuitySequence', () => {
  it(`parses ${positive}`, () => {
    const discontinuitySequence = new DiscontinuitySequence(positive);
    expect(discontinuitySequence.value).toBe(1);
  });

  it(`parses ${negative}`, () => {
    const discontinuitySequence = new DiscontinuitySequence(negative);
    expect(discontinuitySequence.value).toBe(-1);
  });

  it(`parses ${zero}`, () => {
    const discontinuitySequence = new DiscontinuitySequence(zero);
    expect(discontinuitySequence.value).toBe(0);
  });

  it(`doesn't parse ${float}`, () => {
    expect(() => new DiscontinuitySequence(float)).toThrow();
  });
});
