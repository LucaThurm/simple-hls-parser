import { readFileSync } from 'fs';
import { MediaPlaylist } from './media-playlist';

const hls = readFileSync('example.m3u8').toString();

const playlist = new MediaPlaylist(hls);

console.log(JSON.stringify(playlist));
