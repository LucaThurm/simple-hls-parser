import { HLSLine, HLSLineType } from '../../types';
import Joi from 'joi';
import { HLSParsingError } from '../../errors/hls-parsing-error';

export class Version implements HLSLine {
  value: number;

  get type(): HLSLineType {
    return 'BASIC';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-VERSION:([0-9]+)$/);

    if (!matches) {
      throw new Error(`Failed to parse EXT-X-VERSION line "${line}"`);
    }

    this.value = this.#parseValue(matches[1]);
  }

  #parseValue(raw: string) {
    const value = parseInt(raw);

    if (Joi.number().required().integer().positive().validate(value).error) {
      throw new HLSParsingError();
    }

    return value;
  }
}
