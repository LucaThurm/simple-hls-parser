export class HLSAttributeListParsingError extends Error {
  constructor(argList: string) {
    super(`Failed to parse agrument list: ${argList}`);
  }
}
