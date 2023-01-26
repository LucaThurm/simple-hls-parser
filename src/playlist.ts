import { Byterange } from './lines/media-segment/byterange';
import { Discontinuity } from './lines/media-segment/discontinuity';
import { Extinf } from './lines/media-segment/extinf';
import { Extm3u } from './lines/basic/extm3u';
import { Key } from './lines/media-segment/key';
import { Tag } from './tags/tag';
import { Version } from './lines/basic/version';
import { Map } from './tags/map';
import { ProgramDateTime } from './lines/media-segment/program-date-time';
import { TargetDuration } from './lines/media-playlist/targetduration';
import { MediaSequence } from './lines/media-playlist/media-sequence';
import { DiscontinuitySequence } from './lines/media-playlist/discontinuity-sequence';
import { Endlist } from './lines/media-playlist/endlist';
import { PlaylistType } from './lines/media-playlist/playlist-type';
import { IFramesOnly } from './lines/media-playlist/i-frames-only';
import { Uri } from './lines/media-segment/uri';
import { HLSMediaPlaylist, HLSSegment } from './types';
import { Daterange } from './tags/daterange';

export class HLSPlaylist {
  src: string;

  lines: Tag[];

  playlist: any;

  constructor(hls: string) {
    this.src = hls;
    this.lines = this.parse(hls);
  }

  parse(hls: string): Tag[] {
    const lines = hls.split('\n');
    return lines
      .map((l) => {
        if (/#EXTM3U.*/.test(l)) {
          return new Extm3u(l);
        }
        if (/#EXT-X-VERSION.*/.test(l)) {
          return new Version(l);
        }
        if (/#EXTINF.*/.test(l)) {
          return new Extinf(l);
        }
        if (/#EXT-X-BYTERANGE.*/.test(l)) {
          return new Byterange(l);
        }
        if (/#EXT-X-DISCONTINUITY.*/.test(l)) {
          return new Discontinuity(l);
        }
        if (/#EXT-X-KEY.*/.test(l)) {
          return new Key(l);
        }
        if (/#EXT-X-MAP.*/.test(l)) {
          return new Map(l);
        }
        if (/#EXT-X-PROGRAM-DATE-TIME.*/.test(l)) {
          return new ProgramDateTime(l);
        }
        if (/#EXT-X-DATERANGE.*/.test(l)) {
          return new ProgramDateTime(l);
        }
        if (/#EXT-X-TARGETDURATION.*/.test(l)) {
          return new TargetDuration(l);
        }
        if (/#EXT-X-MEDIA-SEQUENCE.*/.test(l)) {
          return new MediaSequence(l);
        }
        if (/#EXT-X-DISCONTINUITY-SEQUENCE.*/.test(l)) {
          return new DiscontinuitySequence(l);
        }
        if (/#EXT-X-ENDLIST.*/.test(l)) {
          return new Endlist(l);
        }
        if (/#EXT-X-PLAYLIST-TYPE.*/.test(l)) {
          return new PlaylistType(l);
        }
        if (/#EXT-X-I-FRAMES-ONLY.*/.test(l)) {
          return new IFramesOnly(l);
        }
        if (l === '') {
          return undefined;
        }
        return new Uri(l);
      })
      .filter((l) => l !== undefined);
  }

  parseMediaPlaylist(lines: Tag[]) {
    const playlist: HLSMediaPlaylist = {
      extm3u: lines.some((l) => l instanceof Extm3u),
      version: (lines.find((l) => l instanceof Version) as Version).value,
    };
  }

  parseMediaSegements(lines: Tag[]): HLSSegment[] {
    const splits: Tag[][] = [];

    lines
      .filter((l) => l.type === 'MEDIA_SEGMENT')
      .forEach((l) => {
        if (l instanceof Uri) {
          splits[splits.length - 1].push(l);
          splits.push([]);
        } else {
          splits[splits.length - 1].push(l);
        }
      });

    return splits.map((s) => ({
      title: (s.find((s) => s instanceof Extinf) as Extinf).title,
      duration: (s.find((s) => s instanceof Extinf) as Extinf).duration,
      byterange: s.find((s) => s instanceof Byterange) as Byterange,
      discontinuity: s.find((s) => s instanceof Discontinuity)
        ? true
        : undefined,
      key: s.find((s) => s instanceof Key) as Key,
      map: s.find((s) => s instanceof Map) as Map,
      dateTime: 
        (s.find((s) => s instanceof ProgramDateTime) as ProgramDateTime).dateTimeMs
      ,
      dateRange: s.find((s) => s instanceof Daterange) as Daterange
      uri: (s.find((s) => s instanceof Uri) as Uri).value,
    }));
  }
}
