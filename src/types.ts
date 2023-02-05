// export interface HLSMasterPlaylist {
//   alternateMedia?: HLSAlternateMedia[];
//   streamInf?: HLSStreamInf[];
//   iFrameStreamInf?: HLSIFrameStreamInf[];
// }

// export interface HLSAlternateMedia {
//   type: 'AUDIO' | 'VIDEO' | 'SUBTITLE' | 'CLOSED-CAPTIONS';
//   uri?: string;
//   groupId: string;
//   language?: string;
//   assocLanguage?: string;
//   name: string;
//   default?: 'YES' | 'NO';
//   autoselect?: 'YES' | 'NO';
//   forced?: 'YES' | 'NO';
//   instreamId?: string;
//   characteristics?: string;
//   channels?: string;
// }

// export interface HLSStreamInf extends HLSIFrameStreamInf {
//   frameRate?: number;
//   audio?: string;
//   subtitles?: string;
//   closedCaptions?: string;
// }

// export interface HLSIFrameStreamInf {
//   bandwidth: number;
//   averageBandwidth?: number;
//   codecs?: string;
//   resolution?: number;
//   hdcpLevel?: 'TYPE-0' | 'NONE';
//   video?: string;
// }

// HLS Media Playlist Output:

export interface HLSMediaPlaylist {
  extm3u: boolean;
  version: number;
  segments: HLSSegment[];
  targetDuration: number;
  mediaSequence: number;
  discontinuitySequence: number;
  endlist?: boolean;
  playlistType?: 'EVENT' | 'VOD';
  iFramesOnly?: boolean;
}

export interface HLSSegment {
  title?: string;
  duration: number;
  byterange?: HLSSegmentByterange;
  discontinuity?: boolean;
  key?: HLSSegmentKey;
  map?: HLSSegmentMap;
  programDateTime?: number;
  daterange?: HLSDateRange;
  uri: string;
}

export interface HLSSegmentByterange {
  length: number;
  start?: number;
}

export interface HLSSegmentKey {
  method: string; //'NONE' | 'AES-128' | 'SAMPLE-AES';
  uri?: string;
  iv?: string;
  keyformat?: string;
  keyformatversions?: string;
}

export interface HLSSegmentMap {
  uri: string;
  byterange?: string;
}

export interface HLSDateRange {
  id: string;
  class?: string;
  startDate: string;
  endDate?: string;
  duration?: number;
  plannedDuration?: number;
  scte35Cmd?: string; // TODO
  scte35Out?: string; // TODO
  scte35In?: string; // TODO
  endOnNext?: true;
}

export interface HLSLine {
  type: HLSLineType;
}

export type HLSClientAttribute = { [key: string]: string | number };

export type HLSLineType =
  | 'BASIC'
  | 'MEDIA_SEGMENT'
  | 'MEDIA_PLAYLIST'
  | 'MASTER_PLAYLIST'
  | 'ANY_PLAYLIST';

export type HLSSegmentKeyMethod = 'NONE' | 'AES-128' | 'SAMPLE-AES';
