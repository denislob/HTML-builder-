const fs = require('node:fs');
const path = require('node:path');

const pathFile = path.join(__dirname, 'text.txt');
const readingFile = fs.createReadStream(pathFile, 'utf-8');

readingFile.on('data', (frag) => console.log(frag.toString()));