import { HLSLine, HLSLineType } from '../../types';
import { HLSParsingError } from '../../errors/hls-parsing-error';

export class Discontinuity implements HLSLine {
  get type(): HLSLineType {
    return 'MEDIA_SEGMENT';
  }

  constructor(line: string) {
    const matches = line.match(/#EXT-X-DISCONTINUITY/);

    if (!matches) {
      throw new HLSParsingError();
    }
  }
}
