import { IFramesOnly } from '../../src/tags/i-frames-only';

const valid = '#EXT-X-I-FRAMES-ONLY';

describe('IFramesOnly', () => {
  it(`parses ${valid}`, () => {
    expect(() => new IFramesOnly(valid)).not.toThrow();
  });
});
