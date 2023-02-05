import {
  HLSDateRange,
  HLSLine,
  HLSSegment,
  HLSSegmentByterange,
  HLSSegmentKey,
  HLSSegmentMap,
} from './types';
import { Extinf } from './tags/extinf';
import { Uri } from './tags/uri';
import { Byterange } from './tags/byterange';
import { Discontinuity } from './tags/discontinuity';
import { Key } from './tags/key';
import { Map } from './tags/map';
import { ProgramDateTime } from './tags/program-date-time';
import { Daterange } from './tags/daterange';
import { HLSParsingError } from './errors/hls-parsing-error';

export class Segment implements HLSSegment {
  title?: string;

  duration: number;

  byterange?: HLSSegmentByterange;

  discontinuity?: boolean;

  key?: HLSSegmentKey;

  map?: HLSSegmentMap;

  programDateTime?: number;

  daterange?: HLSDateRange;

  uri: string;

  constructor(lines: HLSLine[]) {
    this.#validateLines(lines);

    this.#processExtinf(lines.find((l) => l instanceof Extinf) as Extinf);

    this.byterange = lines.find((l) => l instanceof Byterange) as Byterange;

    this.discontinuity = lines.find((l) => l instanceof Discontinuity)
      ? true
      : undefined;

    this.key = lines.find((l) => l instanceof Key) as Key;

    this.map = lines.find((l) => l instanceof Map) as Map;

    this.programDateTime = (
      lines.find((l) => l instanceof ProgramDateTime) as ProgramDateTime
    )?.value;

    this.daterange = lines.find((l) => l instanceof Daterange) as Daterange;

    this.uri = (lines.find((l) => l instanceof Uri) as Uri).value;
  }

  #processExtinf(extinf: Extinf) {
    this.title = extinf.title;

    this.duration = extinf.duration;
  }

  #validateLines(lines: HLSLine[]) {
    const hasOneExtinf = lines.filter((l) => l instanceof Extinf).length === 1;

    const hasOneUri = lines.filter((l) => l instanceof Uri).length === 1;

    const hasMaxOneByterange =
      lines.filter((l) => l instanceof Byterange).length <= 1;

    const hasMaxOneDiscontinuity =
      lines.filter((l) => l instanceof Discontinuity).length <= 1;

    const hasMaxOneKey = lines.filter((l) => l instanceof Key).length <= 1;

    const hasMaxOneMap = lines.filter((l) => l instanceof Map).length <= 1;

    const hasMaxOneProgramDateTime =
      lines.filter((l) => l instanceof ProgramDateTime).length <= 1;

    const hasMaxOneDaterange =
      lines.filter((l) => l instanceof Daterange).length <= 1;

    if (
      !(
        hasOneExtinf &&
        hasOneUri &&
        hasMaxOneByterange &&
        hasMaxOneDiscontinuity &&
        hasMaxOneKey &&
        hasMaxOneMap &&
        hasMaxOneProgramDateTime &&
        hasMaxOneDaterange
      )
    ) {
      throw new HLSParsingError();
    }
  }
}
