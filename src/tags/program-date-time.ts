import { HLSLine, HLSLineType } from '../types';
import { HLSParsingError } from '../errors/hls-parsing-error';
import Joi from 'joi';

export class ProgramDateTime implements HLSLine {
  value: number;

  get type(): HLSLineType {
    return 'MEDIA_SEGMENT';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-PROGRAM-DATE-TIME:([1-9][0-9]*)$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    this.value = this.#parseValue(matches[1]);
  }

  #parseValue(raw: string) {
    const value = parseInt(raw);

    if (Joi.number().integer().positive().required().validate(raw).error) {
      throw new HLSParsingError();
    }

    return value;
  }
}
