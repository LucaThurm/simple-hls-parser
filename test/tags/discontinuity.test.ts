import { Discontinuity } from '../../src/tags/discontinuity';

const valid = '#EXT-X-DISCONTINUITY';

describe('Discontinuity', () => {
  it(`parses ${valid}`, () => {
    expect(() => new Discontinuity(valid)).not.toThrow();
  });
});
