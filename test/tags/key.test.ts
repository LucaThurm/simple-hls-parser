import { Key } from '../../src/tags/key';

const aes128 =
  '#EXT-X-KEY:METHOD=AES-128,URI="https://priv.example.com/key.php?r=53"';

const sampleAes =
  '#EXT-X-KEY:METHOD=SAMPLE-AES,URI="https://priv.example.com/key.php?r=53"';

const none = '#EXT-X-KEY:METHOD=NONE';

const noUriAes128 = '#EXT-X-KEY:METHOD=AES-128';

const noUriSampleAes = '#EXT-X-KEY:METHOD=SAMPLE-AES';

const wellFormedIv =
  '#EXT-X-KEY:METHOD=AES-128,URI="https://priv.example.com/key.php?r=53",IV=12FD1';

const badIv =
  '#EXT-X-KEY:METHOD=AES-128,URI="https://priv.example.com/key.php?r=53",IV=XYZ123';

const wellFormedKfv =
  '#EXT-X-KEY:METHOD=AES-128,URI="https://priv.example.com/key.php?r=53",KEYFORMATVERSIONS="1/2/3"';

const badKfv =
  '#EXT-X-KEY:METHOD=AES-128,URI="https://priv.example.com/key.php?r=53",KEYFORMATVERSIONS="-1/A/3"';

const keyformat =
  '#EXT-X-KEY:METHOD=AES-128,URI="https://priv.example.com/key.php?r=53",KEYFORMATVERSIONS="1/2/3",KEYFORMAT="https://priv.example.com/key.php?r=53"';

describe('Key', () => {
  it(`parses ${aes128}`, () => {
    const key = new Key(aes128);
    expect(key.iv).toBeUndefined();
    expect(key.keyformat).toBeUndefined();
    expect(key.keyformatversions).toBeUndefined();
    expect(key.method).toBe('AES-128');
    expect(key.uri).toBe('https://priv.example.com/key.php?r=53');
  });

  it(`parses ${sampleAes}`, () => {
    const key = new Key(sampleAes);
    expect(key.iv).toBeUndefined();
    expect(key.keyformat).toBeUndefined();
    expect(key.keyformatversions).toBeUndefined();
    expect(key.method).toBe('SAMPLE-AES');
    expect(key.uri).toBe('https://priv.example.com/key.php?r=53');
  });

  it(`parses ${none}`, () => {
    const key = new Key(none);
    expect(key.iv).toBeUndefined();
    expect(key.keyformat).toBeUndefined();
    expect(key.keyformatversions).toBeUndefined();
    expect(key.method).toBe('NONE');
    expect(key.uri).toBeUndefined();
  });

  it(`parses ${keyformat}`, () => {
    const key = new Key(keyformat);
    expect(key.keyformat).toBe('https://priv.example.com/key.php?r=53');
  });

  it(`parses ${wellFormedIv}`, () => {
    const key = new Key(wellFormedIv);
    expect(key.iv).toBe('12FD1');
  });

  it(`parses ${wellFormedKfv}`, () => {
    const key = new Key(wellFormedKfv);
    expect(key.keyformatversions).toBe('1/2/3');
  });

  it(`doesn't parse ${noUriAes128}`, () => {
    expect(() => new Key(noUriAes128)).toThrow();
  });

  it(`doesn't parse ${noUriSampleAes}`, () => {
    expect(() => new Key(noUriSampleAes)).toThrow();
  });

  it(`doesn't parse ${badIv}`, () => {
    expect(() => new Key(badIv)).toThrow();
  });

  it(`doesn't parse ${badKfv}`, () => {
    expect(() => new Key(badKfv)).toThrow();
  });
});
