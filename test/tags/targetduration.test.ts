import { TargetDuration } from '../../src/lines/media-playlist/targetduration';

const valid = '#EXT-X-TARGETDURATION:3';

const missingDuration = '#EXT-X-TARGETDURATION';

const floatDuration = '#EXT-X-TARGETDURATION:1.3';

const negativeDuration = '#EXT-X-TARGETDURATION:-3';

describe('#EXT-X-TARGETDURATION', () => {
  it(`parses "${valid}"`, () => {
    let instance: TargetDuration;

    expect(() => {
      instance = new TargetDuration(valid);
    }).not.toThrow();

    expect(instance.value).toBe(3);
  });

  it(`doesn't parse "${missingDuration}"`, () => {
    expect(() => {
      new TargetDuration(missingDuration);
    }).toThrow();
  });

  it(`doesn't parse "${floatDuration}"`, () => {
    expect(() => {
      new TargetDuration(floatDuration);
    }).toThrow();
  });

  it(`doesn't parse "${negativeDuration}"`, () => {
    expect(() => {
      new TargetDuration(negativeDuration);
    }).toThrow();
  });
});
