import { HLSAttributeListParsingError } from '../errors/hls-attribute-list-parsing-error';

export function parseAttributeList(attrList: string) {
  const regex = /(?:((?:[A-Z0-9-])+)=("[^"]*"|0[xX][a-fA-F0-9]+|[A-Z0-9-]+))+/g;

  const matches = [...attrList.matchAll(regex)];

  if (!matches || matches.length === 0) {
    throw new HLSAttributeListParsingError(attrList);
  }

  return matches.map((m) => {
    const valueMatches = m[2].match(/^"([^"]*)"$/);
    return { key: m[1], value: valueMatches ? valueMatches[1] : m[2] };
  });
}
