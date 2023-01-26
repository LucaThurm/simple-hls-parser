import { HLSLine, HLSLineType } from '../../types';

export class Uri implements HLSLine {
  value: string;

  get type(): HLSLineType {
    return 'MEDIA_SEGMENT';
  }

  constructor(line: string) {
    this.value = this.#parseValue(line);
  }

  #parseValue(raw: string) {
    // TODO: implement validation for URIs
    return raw;
  }
}
