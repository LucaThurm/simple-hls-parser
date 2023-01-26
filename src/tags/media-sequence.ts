import { HLSLine, HLSLineType } from '../types';
import { HLSParsingError } from '../errors/hls-parsing-error';
import Joi from 'joi';

export class MediaSequence implements HLSLine {
  value: number;

  get type(): HLSLineType {
    return 'MEDIA_PLAYLIST';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-MEDIA-SEQUENCE:([0-9]+)$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    this.value = this.#parseValue(matches[1]);
  }

  #parseValue(raw: string) {
    const value = parseInt(raw);

    if (Joi.number().required().integer().validate(value).error) {
      throw new HLSParsingError();
    }

    return value;
  }
}
