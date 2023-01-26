export class HLSTagParsingError extends Error {
  constructor(tag: string, line: string) {
    super(`Failed to parse ${tag} line: ${line}`);
  }
}
