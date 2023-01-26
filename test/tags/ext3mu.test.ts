import { Extm3u } from '../../src/lines/basic/extm3u';

const validLine = '#EXTM3U';

const invalidLine = 'EXT3MU';

describe('EXT3MU', () => {
  it(`parses well-formed line "${validLine}"`, () => {
    expect(() => {
      new Extm3u(validLine);
    }).not.toThrow();
  });

  it(`doesn't parse non well-formed line "${invalidLine}"`, () => {
    expect(() => {
      new Extm3u(invalidLine);
    }).toThrow();
  });
});
