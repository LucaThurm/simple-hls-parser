import { Map } from '../../src/tags/map';

const onlyUrl = '#EXT-X-MAP:URI="https://priv.example.com/key.php?r=53"';

const withByterange =
  '#EXT-X-MAP:URI="https://priv.example.com/key.php?r=53",BYTERANGE="10@5"';

const withByterangeLengthOnly =
  '#EXT-X-MAP:URI="https://priv.example.com/key.php?r=53",BYTERANGE="10"';

const withBadByterange =
  '#EXT-X-MAP:URI="https://priv.example.com/key.php?r=53",BYTERANGE="TEST"';

const noUri = '#EXT-X-MAP:';

describe('Map', () => {
  it(`parses ${onlyUrl}`, () => {
    const map = new Map(onlyUrl);
    expect(map.byterange).toBeUndefined();
    expect(map.uri).toBe('https://priv.example.com/key.php?r=53');
  });

  it(`parses ${withByterange}`, () => {
    const map = new Map(withByterange);
    expect(map.byterange).toBe('10@5');
    expect(map.uri).toBe('https://priv.example.com/key.php?r=53');
  });

  it(`parses ${withByterangeLengthOnly}`, () => {
    const map = new Map(withByterangeLengthOnly);
    expect(map.byterange).toBe('10');
    expect(map.uri).toBe('https://priv.example.com/key.php?r=53');
  });

  it(`doesn't parse ${noUri}`, () => {
    expect(() => new Map(noUri)).toThrow();
  });

  it(`doesn't parse ${withBadByterange}`, () => {
    expect(() => new Map(withBadByterange)).toThrow();
  });
});
