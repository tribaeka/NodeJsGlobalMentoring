const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

const csvFilePath = path.resolve(__dirname, 'csv/data.csv');
const txtFilePath = path.resolve(__dirname, 'data.txt');

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

readStream.pipe(csv()).pipe(writeStream);
