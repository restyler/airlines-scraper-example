import { promises as fs } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

import { getHeaders } from './lib.js';


const HEADERS_PATH = new URL('../storage/headers.json', import.meta.url);

console.log('trying to catch headers..')
let headers = await getHeaders();

console.log('writing headers to file..')
await fs.writeFile(HEADERS_PATH, JSON.stringify(headers));
console.log('headers', headers);
