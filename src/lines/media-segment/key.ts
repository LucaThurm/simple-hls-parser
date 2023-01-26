import { parseAttributeList } from '../../utils/parsing';
import { HLSTagParsingError } from '../../errors/hls-tag-parsing-error';
import {
  HLSLine,
  HLSLineType,
  HLSSegmentKey,
  HLSSegmentKeyMethod,
} from '../../types';
import Joi from 'joi';
import { HLSParsingError } from '../../errors/hls-parsing-error';

export class Key implements HLSLine, HLSSegmentKey {
  method: string;

  uri?: string;

  iv?: string;

  keyformat?: string;

  keyformatversions?: string;

  get type(): HLSLineType {
    return 'MEDIA_SEGMENT';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-KEY:(.*)$/);

    if (!matches) {
      throw new HLSTagParsingError('#EXT-X-KEY', line);
    }

    const attributes = parseAttributeList(matches[1]);

    this.method = this.#parseMethod(
      attributes.find((a) => a.key === 'METHOD')?.value
    );

    this.uri = this.#parseUri(attributes.find((a) => a.key === 'URI')?.value);

    this.iv = this.#parseIv(attributes.find((a) => a.key === 'IV')?.value);

    this.keyformat = this.#parseKeyformat(
      attributes.find((a) => a.key === 'KEYFORMAT')?.value
    );

    this.keyformatversions = this.#parseKeyformatversions(
      attributes.find((a) => a.key === 'KEYFORMATVERSIONS')?.value
    );

    this.#validateContext();
  }

  #parseMethod(raw: string): HLSSegmentKeyMethod {
    if (
      Joi.string()
        .required()
        .valid('NONE', 'AES-128', 'SAMPLE-AES')
        .validate(raw).error
    ) {
      throw new HLSParsingError();
    }

    return raw as HLSSegmentKeyMethod;
  }

  #parseUri(raw: string) {
    if (Joi.string().uri().optional().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #parseIv(raw: string) {
    if (Joi.string().hex().optional().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #parseKeyformat(raw: string) {
    if (Joi.string().uri().optional().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #parseKeyformatversions(raw: string) {
    if (
      Joi.string()
        .optional()
        .pattern(/^[1-9][0-9]*(?:\/[1-9][0-9]*)*$/)
        .validate(raw).error
    ) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #validateContext() {
    const validUri = this.method === 'NONE' || this.uri;

    if (!validUri) {
      throw new HLSParsingError();
    }
  }
}
