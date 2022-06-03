import { promises as fs } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

import { scrape } from './lib.js';

const HEADERS_PATH = new URL('../storage/headers.json', import.meta.url);


let headers = JSON.parse(await fs.readFile(HEADERS_PATH));

console.log('trying to execute scraping now..');
let result = await scrape(headers);


console.log('result', result);
