import { HLSLine, HLSLineType } from '../../types';
import { HLSParsingError } from '../../errors/hls-parsing-error';
import Joi from 'joi';

export class ProgramDateTime implements HLSLine {
  value: string;

  get type(): HLSLineType {
    return 'MEDIA_SEGMENT';
  }

  constructor(line: string) {
    const matches = line.match(/^EXT-X-DATE-RANGE:(.*)$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    this.value = this.#parseValue(matches[1]);
  }

  #parseValue(raw: string) {
    if (Joi.string().isoDate().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }
}
