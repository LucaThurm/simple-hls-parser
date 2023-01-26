import Joi from 'joi';
import { HLSParsingError } from '../errors/hls-parsing-error';
import { HLSLine, HLSLineType } from '../types';

export class TargetDuration implements HLSLine {
  value: number;

  get type(): HLSLineType {
    return 'BASIC';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-TARGETDURATION:([0-9]+)$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    this.value = this.#parseValue(matches[1]);
  }

  #parseValue(raw: string) {
    const value = parseInt(raw);

    if (Joi.number().integer().required().positive().validate(value).error) {
      throw new HLSParsingError();
    }

    return value;
  }
}
