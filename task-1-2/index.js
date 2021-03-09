const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');
const { pipeline } = require('stream');


const csvFilePath = path.resolve(__dirname, 'csv/data.csv');
const txtFilePath = path.resolve(__dirname, 'data.txt');

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

const parseCsv = () => {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            let hasError = false;
            jsonObj.forEach(item => {
                fs.appendFile(txtFilePath, `${JSON.stringify(item)}\n`, err => {
                    if (err) {
                        console.error('Failed to modify data.txt.', err);
                        hasError = true;
                    }
                })
                if (!hasError) {
                    console.log('data.txt created.');
                }
            })
        });
};
const parseCsvWithPipeline = () => {
    pipeline(
        readStream,
        csv(),
        writeStream,
        err => {
            if (err) {
                console.error('Failed to create data.txt.', err);
            } else {
                console.log('data.txt created.');
            }
        }
    );
};

parseCsv();

