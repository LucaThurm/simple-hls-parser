import { HLSParsingError } from '../errors/hls-parsing-error';
import { HLSLine, HLSLineType } from '../types';

export class IndependentSegments implements HLSLine {
  get type(): HLSLineType {
    return 'ANY_PLAYLIST';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-INDEPENDENT-SEGMENTS$/);

    if (!matches) {
      throw new HLSParsingError();
    }
  }
}
