import { validateSync } from 'class-validator';
import { HLSLineType } from '../types';

export class Tag {
  get type(): HLSLineType {
    throw new Error('Type not specified');
  }

  validate(): boolean {
    const validationErrors = validateSync(this);
    if (validationErrors.length !== 0) {
      console.log(validationErrors);
    }
    return validationErrors.length === 0;
  }
}
