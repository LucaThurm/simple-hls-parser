import { PlaylistType } from '../../src/tags/playlist-type';

const eventType = '#EXT-X-PLAYLIST-TYPE:EVENT';

const vod = '#EXT-X-PLAYLIST-TYPE:VOD';

const invalid = '#EXT-X-PLAYLIST-TYPE:INVALID';

describe('PlaylistType', () => {
  it(`parses ${eventType}`, () => {
    const playlistType = new PlaylistType(eventType);
    expect(playlistType.value).toBe('EVENT');
  });

  it(`parses ${vod}`, () => {
    const playlistType = new PlaylistType(vod);
    expect(playlistType.value).toBe('VOD');
  });

  it(`doesn't parse ${invalid}`, () => {
    expect(() => new PlaylistType(invalid)).toThrow();
  });
});
