import Joi from 'joi';
import { HLSParsingError } from '../errors/hls-parsing-error';
import {
  HLSClientAttribute as HLSClientAttributes,
  HLSDateRange,
  HLSLine,
  HLSLineType,
} from '../types';
import { parseAttributeList } from '../utils/parse-attribute-list';

export class Daterange implements HLSLine, HLSDateRange {
  id: string;

  class?: string;

  startDate: string;

  endDate?: string;

  duration?: number;

  plannedDuration?: number;

  clientAttributes?: HLSClientAttributes;

  scte35Cmd?: string;

  scte35Out?: string;

  scte35In?: string;

  endOnNext?: true;

  get type(): HLSLineType {
    return 'MEDIA_SEGMENT';
  }

  constructor(line: string) {
    const matches = line.match(/^#EXT-X-DATERANGE:(.*)$/);

    if (!matches) {
      throw new HLSParsingError();
    }

    const attributes = parseAttributeList(matches[1]);

    this.id = this.#parseId(attributes.find((a) => a.key === 'ID')?.value);

    this.class = this.#parseClass(
      attributes.find((a) => a.key === 'CLASS')?.value
    );

    this.startDate = this.#parseStartDate(
      attributes.find((a) => a.key === 'START-DATE')?.value
    );

    this.endDate = this.#parseEndDate(
      attributes.find((a) => a.key === 'END-DATE')?.value
    );

    this.duration = this.#parseDuration(
      attributes.find((a) => a.key === 'DURATION')?.value
    );

    this.plannedDuration = this.#parseDuration(
      attributes.find((a) => a.key === 'PLANNED-DURATION')?.value
    );

    this.clientAttributes = this.#parseClientAttributes(
      attributes.filter((a) => a.key.match(/^X-(.*)$/))
    );

    this.scte35Cmd = this.#parseSCTE(
      attributes.find((a) => a.key === 'SCTE35-CMD')?.value
    );

    this.scte35In = this.#parseSCTE(
      attributes.find((a) => a.key === 'SCTE35-IN')?.value
    );

    this.scte35Out = this.#parseSCTE(
      attributes.find((a) => a.key === 'SCTE35-OUT')?.value
    );

    this.endOnNext = this.#parseEndOnNext(
      attributes.find((a) => a.key === 'END-ON-NEXT')?.value
    );

    this.#validateContenxt();
  }

  #parseId(raw: string) {
    if (Joi.string().required().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #parseClass(raw: string) {
    if (Joi.string().optional().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #parseStartDate(raw: string) {
    if (Joi.string().required().isoDate().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #parseEndDate(raw: string) {
    if (Joi.string().optional().isoDate().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #parseDuration(raw: string) {
    const duration = parseFloat(raw) || undefined;

    if (Joi.number().optional().min(0).validate(duration).error) {
      throw new HLSParsingError();
    }

    return duration;
  }

  #parseClientAttributes(raw: HLSClientAttributes[]) {
    const attributes = raw.reduce(
      (prev, cur) => ({ ...prev, [cur.key]: cur.value }),
      {}
    );

    const validator = Joi.object().pattern(
      /X-[a-zA-Z0-9-]+/,
      Joi.alternatives(Joi.string().required(), Joi.number().required())
    );

    if (validator.validate(attributes).error) {
      throw new HLSParsingError();
    }

    return attributes;
  }

  #parseSCTE(raw: string) {
    if (Joi.string().optional().validate(raw).error) {
      throw new HLSParsingError();
    }

    return raw;
  }

  #parseEndOnNext(raw: string): undefined | true {
    if (Joi.string().optional().valid('YES').validate(raw).error) {
      throw new HLSParsingError();
    }

    return !!raw || undefined;
  }

  #validateContenxt() {
    const validDates =
      !this.endDate || new Date(this.endDate) >= new Date(this.startDate);

    if (!validDates) {
      throw new HLSParsingError();
    }
  }
}
