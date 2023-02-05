import { ProgramDateTime } from '../../src/tags/program-date-time';

const valid = '#EXT-X-PROGRAM-DATE-TIME:1675350666805';

const invalid = '#EXT-X-PROGRAM-DATE-TIME:-1675350666805';

describe('ProgramDateTime', () => {
  it(`parses ${valid}`, () => {
    const programDateTime = new ProgramDateTime(valid);
    expect(programDateTime.value).toBe(1675350666805);
  });

  it(`doesn't parse ${invalid}`, () => {
    expect(() => new ProgramDateTime(invalid)).toThrow();
  });
});
