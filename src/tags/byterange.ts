import { HLSLine, HLSLineType, HLSSegmentByterange } from '../types';
import Joi from 'joi';
import { HLSParsingError } from '../errors/hls-parsing-error';

export class Byterange implements HLSLine, HLSSegmentByterange {
  length: number;

  start?: number;

  get type(): HLSLineType {
    return 'MEDIA_SEGMENT';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-BYTERANGE:([0-9]+)(@([0-9]+))?$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    this.length = this.#parseLength(matches[1]);

    this.start = this.#parseStart(matches[3]);
  }

  #parseLength(raw: string) {
    const length = parseInt(raw);

    if (Joi.number().required().integer().positive().validate(length).error) {
      throw new HLSParsingError();
    }

    return length;
  }

  #parseStart(raw: string) {
    const start = parseInt(raw);

    if (Joi.number().optional().integer().positive().validate(length).error) {
      throw new HLSParsingError();
    }

    return start;
  }
}
