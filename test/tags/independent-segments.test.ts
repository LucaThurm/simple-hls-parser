import { IndependentSegments } from '../../src/tags/independent-segments';

const valid = '#EXT-X-INDEPENDENT-SEGMENTS';

describe('IndependentSegments', () => {
  it(`parses ${valid}`, () => {
    expect(() => new IndependentSegments(valid)).not.toThrow();
  });
});
