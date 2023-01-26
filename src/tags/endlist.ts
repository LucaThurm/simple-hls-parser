import { HLSParsingError } from '../errors/hls-parsing-error';
import { HLSLine, HLSLineType } from '../types';

export class Endlist implements HLSLine {
  get type(): HLSLineType {
    return 'MEDIA_PLAYLIST';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-ENDLIST$/);

    if (!matches) {
      throw new HLSParsingError();
    }
  }
}
