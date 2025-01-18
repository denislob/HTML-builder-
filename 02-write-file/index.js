const fs = require('node:fs');
const path = require('node:path');
const readLine = require('node:readline');
const { stdin, stdout } = require('node:process');
const pathFile = path.join(__dirname, 'text.txt');
const writeFile = fs.createWriteStream(pathFile, 'utf-8');

console.log('Enter text or enter exit');

const rLine = readLine.createInterface({ 
    input: stdin, 
    output: stdout 
});

rLine.on('line', (text) => {
    const userInput = text.toString().trim();
    userInput === 'exit' ? rLine.close() : writeFile.write(userInput + '\n');
});

rLine.on('close', () => {
    console.log('Program completed');
});

process.on('SIGINT', () => {
    rLine.close();
    writeFile.close();
});


