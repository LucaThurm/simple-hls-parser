import { HLSParsingError } from '../errors/hls-parsing-error';
import { HLSLine, HLSLineType } from '../types';

export class Extm3u implements HLSLine {
  get type(): HLSLineType {
    return 'BASIC';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXTM3U$/);

    if (!matches) {
      throw new HLSParsingError();
    }
  }
}
