import { Extm3u } from './lines/basic/extm3u';
import { Version } from './lines/basic/version';
import { DiscontinuitySequence } from './lines/media-playlist/discontinuity-sequence';
import { Endlist } from './lines/media-playlist/endlist';
import { IFramesOnly } from './lines/media-playlist/i-frames-only';
import { MediaSequence } from './lines/media-playlist/media-sequence';
import { PlaylistType } from './lines/media-playlist/playlist-type';
import { TargetDuration } from './lines/media-playlist/targetduration';
import { Byterange } from './lines/media-segment/byterange';
import { ProgramDateTime } from './lines/media-segment/program-date-time';
import { Discontinuity } from './lines/media-segment/discontinuity';
import { Extinf } from './lines/media-segment/extinf';
import { Key } from './lines/media-segment/key';
import { Uri } from './lines/media-segment/uri';
import { Map } from './lines/media-segment/map';
import { HLSLine, HLSMediaPlaylist, HLSSegment } from './types';
import { Segment } from './media-segment';
import { HLSParsingError } from './errors/hls-parsing-error';

export class MediaPlaylist implements HLSMediaPlaylist {
  extm3u: boolean;

  version: number;

  segments: HLSSegment[];

  targetDuration: number;

  mediaSequence: number;

  discontinuitySequence: number;

  endlist?: boolean;

  playlistType?: 'EVENT' | 'VOD';

  iFramesOnly?: boolean;

  constructor(hls: string) {
    const lines = this.#parseLines(hls.split('\n'));

    this.#validateLines(lines);

    this.extm3u = lines.some((l) => l instanceof Extm3u) ? true : undefined;

    this.version = (lines.find((l) => l instanceof Version) as Version)?.value;

    this.segments = this.#parseSegments(lines);

    this.targetDuration = (
      lines.find((l) => l instanceof TargetDuration) as TargetDuration
    )?.value;

    this.mediaSequence = (
      lines.find((l) => l instanceof MediaSequence) as MediaSequence
    )?.value;

    this.discontinuitySequence = (
      lines.find(
        (l) => l instanceof DiscontinuitySequence
      ) as DiscontinuitySequence
    )?.value;

    this.endlist = lines.some((l) => l instanceof Endlist) ? true : undefined;

    this.playlistType = (
      lines.find((l) => l instanceof PlaylistType) as PlaylistType
    )?.value;

    this.iFramesOnly = lines.some((l) => l instanceof IFramesOnly)
      ? true
      : undefined;
  }

  #parseLines(lines: string[]) {
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

  #parseSegments(lines: HLSLine[]) {
    return lines
      .filter((l) => l.type === 'MEDIA_SEGMENT')
      .reduce((all, cur, idx, arr): HLSLine[][] => {
        if (all.length === 0) {
          all.push([]);
        }

        all[all.length - 1].push(cur);

        if (cur instanceof Uri && idx !== arr.length - 1) {
          all.push([]);
        }

        return all;
      }, [])
      .map((s) => new Segment(s));
  }

  #validateLines(lines: HLSLine[]) {
    const hasOneExtm3u = lines.filter((l) => l instanceof Extm3u).length === 1;

    const hasOneVersion =
      lines.filter((l) => l instanceof Version).length === 1;

    const hasOneTargetDuration =
      lines.filter((l) => l instanceof TargetDuration).length === 1;

    const hasMaxOneMediaSequence =
      lines.filter((l) => l instanceof MediaSequence).length <= 1;

    const hasMaxOneDiscSequence =
      lines.filter((l) => l instanceof DiscontinuitySequence).length <= 1;

    const hasMaxOneEndlist =
      lines.filter((l) => l instanceof Endlist).length <= 1;

    const hasMaxOnePlaylistType =
      lines.filter((l) => l instanceof PlaylistType).length <= 1;

    const hasMaxOneIFramesOnly =
      lines.filter((l) => l instanceof IFramesOnly).length <= 1;

    if (
      !(
        hasOneExtm3u &&
        hasOneVersion &&
        hasOneTargetDuration &&
        hasMaxOneMediaSequence &&
        hasMaxOneDiscSequence &&
        hasMaxOneEndlist &&
        hasMaxOneIFramesOnly &&
        hasMaxOnePlaylistType
      )
    ) {
      throw new HLSParsingError();
    }
  }
}
