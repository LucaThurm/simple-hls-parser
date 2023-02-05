import { Endlist } from '../../src/tags/endlist';

const valid = '#EXT-X-ENDLIST';

describe('Endlist', () => {
  it(`parses ${valid}`, () => {
    expect(() => new Endlist(valid)).not.toThrow();
  });
});
