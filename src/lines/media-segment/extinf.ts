import { HLSLine, HLSLineType } from '../../types';
import Joi from 'joi';
import { HLSParsingError } from '../../errors/hls-parsing-error';

export class Extinf implements HLSLine {
  duration: number;

  title?: string;

  get type(): HLSLineType {
    return 'MEDIA_SEGMENT';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXTINF:([0-9]+(.[0-9]+)?),(.+)?$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    this.duration = this.#parseDuration(matches[1]);

    this.title = this.#parseTitle(matches[3]);
  }

  #parseDuration(raw: string) {
    const duration = Number(raw);

    if (Joi.number().required().positive().validate(duration).error) {
      throw new HLSParsingError();
    }

    return duration;
  }

  #parseTitle(raw: string) {
    if (Joi.string().optional().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }
}
