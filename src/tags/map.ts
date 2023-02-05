import { HLSLine, HLSLineType, HLSSegmentMap } from '../types';
import Joi from 'joi';
import { HLSParsingError } from '../errors/hls-parsing-error';
import { parseAttributeList } from '../utils/parse-attribute-list';

export class Map implements HLSLine, HLSSegmentMap {
  uri: string;

  byterange?: string;

  get type(): HLSLineType {
    return 'MEDIA_SEGMENT';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-MAP:(.*)$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    const attributes = parseAttributeList(matches[1]);

    this.uri = this.#parseUri(attributes.find((a) => a.key === 'URI')?.value);

    this.byterange = this.#parseByterange(
      attributes.find((a) => a.key === 'BYTERANGE')?.value
    );
  }

  #parseUri(raw: string) {
    if (Joi.string().required().uri().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #parseByterange(raw: string) {
    if (
      Joi.string()
        .optional()
        .pattern(/^[0-9]+(?:@[0-9]+)?/)
        .validate(raw).error
    ) {
      throw new HLSParsingError();
    }

    return raw;
  }
}
