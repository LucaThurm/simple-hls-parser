import { HLSLine, HLSLineType } from '../types';
import { HLSParsingError } from '../errors/hls-parsing-error';
import Joi from 'joi';

export class PlaylistType implements HLSLine {
  value: 'EVENT' | 'VOD';

  get type(): HLSLineType {
    return 'MEDIA_PLAYLIST';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-PLAYLIST-TYPE:(EVENT|VOD)$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    this.value = this.#parseValue(matches[1]);
  }

  #parseValue(raw: string) {
    if (Joi.string().valid(['EVENT', 'VOD']).validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw as 'EVENT' | 'VOD';
  }
}
