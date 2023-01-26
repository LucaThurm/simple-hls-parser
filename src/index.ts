import { readFileSync } from 'fs';
import { MediaPlaylist } from './playlist-v2';

const hls = readFileSync('example.m3u8').toString();

const playlist = new MediaPlaylist(hls);

console.log(JSON.stringify(playlist));
