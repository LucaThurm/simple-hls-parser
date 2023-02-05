import Joi from 'joi';
import { HLSParsingError } from '../errors/hls-parsing-error';
import { HLSLine, HLSLineType } from '../types';
import { parseAttributeList } from '../utils/parse-attribute-list';

export class Start implements HLSLine {
  timeOffset: number;

  precise?: string;

  get type(): HLSLineType {
    return 'ANY_PLAYLIST';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-START:(.*)?$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    const attributes = parseAttributeList(matches[1]);

    this.timeOffset = this.#parseTimeOffset(
      attributes.find((a) => a.key === 'TIME-OFFSET')?.value
    );

    this.precise = this.#parsePrecise(
      attributes.find((a) => a.key === 'PRECISE')?.value
    );
  }

  #parseTimeOffset(raw: string) {
    console.log(raw);

    const timeOffset = parseFloat(raw);

    if (Joi.number().required().validate(timeOffset).error) {
      throw new HLSParsingError();
    }

    return timeOffset;
  }

  #parsePrecise(raw: string) {
    if (Joi.string().optional().valid('YES', 'NO').validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }
}
