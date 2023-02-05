import { HLSParsingError } from '../errors/hls-parsing-error';

export function parseAttributeList(attrList: string) {
  const regex =
    /(?:((?:[A-Z0-9-])+)=(-?[0-9]+\.[0-9]+|"[^"]*"|0[xX][a-fA-F0-9]+|[A-Z0-9-]+))+/g;

  const matches = [...attrList.matchAll(regex)];

  if (!matches || matches.length === 0) {
    throw new HLSParsingError(attrList);
  }

  return matches.map((m) => {
    const valueMatches = m[2].match(/^"([^"]*)"$/);
    return { key: m[1], value: valueMatches ? valueMatches[1] : m[2] };
  });
}

// export function parseAttributeList(attrList: string) {
//   const regex =
//     /(?:((?:[A-Z0-9-])+)=((-?[0-9]+\.[0-9]+)|("[^"]*"|0[xX][a-fA-F0-9]+)|([A-Z0-9-]+)))+/g;

//   const matches = [...attrList.matchAll(regex)];

//   if (!matches || matches.length === 0) {
//     throw new HLSParsingError(attrList);
//   }

//   return matches
//     .map((m) => {
//       if (m[4]) {
//         return {
//           key: m[1],
//           value: m[4].substring(1, m[4].length - 1),
//         };
//       }

//       if (m[3]) {
//         return {
//           key: m[1],
//           value: parseFloat(m[3]),
//         };
//       }

//       return { key: m[1], value: m[2] };
//     })
//     .map((m) => ({ [m.key]: m.value }))
//     .reduce((prev, cur) => ({ ...prev, ...cur }));
// }
