import { Dataset } from './interfaces';
import { parseEmptyStrings } from './parsers';

const fs = require('fs');
const { parse } = require('csv-parse');

let dataset!: Dataset[];

let a: string[] = [];

fs.createReadStream('./src/data/2023.2_Sysarmy_Dataset.csv')
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', (row: string[]) => {
    const nulledRow = parseEmptyStrings(row);

    if (!a.includes(row[26])) {
      a.push(row[26]);
    }
  })
  .on('end', () => {
    console.log(a);
  })
  .on('error', (error: any) => {
    console.log(error.message);
  });
