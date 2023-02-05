import { Version } from '../../src/tags/version';

const valid = '#EXT-X-VERSION:2';

const lowerCase = '#ext-x-version:2';

const missingTag = 'EXT-X-VERSION:2';

const negativeVersion = '#EXT-X-VERSION:-1';

const noVersion = '#EXT-X-VERSION';

describe('Version', () => {
  it(`parses "${valid}"`, () => {
    expect(() => {
      new Version(valid);
    }).not.toThrow();
  });

  it(`doesn't parse "${lowerCase}"`, () => {
    expect(() => {
      new Version(lowerCase);
    }).toThrow();
  });

  it(`doesn't parse "${missingTag}"`, () => {
    expect(() => {
      new Version(missingTag);
    }).toThrow();
  });

  it(`doesn't parse "${negativeVersion}"`, () => {
    expect(() => {
      new Version(negativeVersion);
    }).toThrow();
  });

  it(`doesn't parse "${noVersion}"`, () => {
    expect(() => {
      new Version(noVersion);
    }).toThrow();
  });
});
