import { MediaSequence } from '../../src/lines/media-playlist/media-sequence';

const valid = '#EXT-X-MEDIA-SEQUENCE:2';

const lowerCase = '#ext-x-media-sequence:2';

const missingTag = 'EXT-X-MEDIA-SEQUENCE:2';

const negativeValue = '#EXT-X-MEDIA-SEQUENCE:-1';

const noValue = '#EXT-X-MEDIA-SEQUENCE';

describe('EXT-X-MediaSequence', () => {
  let instance: MediaSequence;

  it(`parses "${valid}"`, () => {
    expect(() => {
      instance = new MediaSequence(valid);
    }).not.toThrow();

    expect(instance.value).toBe(2);
  });

  it(`doesn't parse "${lowerCase}"`, () => {
    expect(() => {
      new MediaSequence(lowerCase);
    }).toThrow();
  });

  it(`doesn't parse "${missingTag}"`, () => {
    expect(() => {
      new MediaSequence(missingTag);
    }).toThrow();
  });

  it(`doesn't parse "${negativeValue}"`, () => {
    expect(() => {
      new MediaSequence(negativeValue);
    }).toThrow();
  });

  it(`doesn't parse "${noValue}"`, () => {
    expect(() => {
      new MediaSequence(noValue);
    }).toThrow();
  });
});
