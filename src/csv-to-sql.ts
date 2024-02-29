import { Dataset, IndecSeries } from './app/interfaces';
import { objectToSql, parseColumns, parseEmptyStrings } from './app/parsers';
import fs from 'fs';
import { parse } from 'csv';
import { fromFetch } from 'rxjs/fetch';
import { Subject, take } from 'rxjs';
import { valuesExtractor, keysExtractor } from './app/objects';
import { EXAMPLE_DATASET } from './app/consts';
import { format } from 'sql-formatter';

export function csvToSql() {
  let dataset: Dataset[] = [];

  const result: Subject<string> = new Subject<string>();

  console.log('Parsing Dataset');

  // Parse sysarmy dataset
  fs.createReadStream('./src/data/2023.07_Sysarmy_Dataset.csv')
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row: string[]) => {
      parseColumns(row, dataset, new Date('Jul 01 2023'));
    })
    .on('end', () => {
      // Saving to file to have in hand
      fs.writeFile(
        './dist/JSONs/2023.07_Sysarmy_Dataset.json',
        JSON.stringify(dataset),
        error => {
          if (error) console.log(error);

          console.log('Converting Dataset to SQL query');
          result.next(objectToSql(dataset));
        }
      );
    })
    .on('error', (error: any) => {
      console.log(error.message);
    });

  // Get inflation from INDEC
  // fromFetch<IndecSeries>(
  //   'https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELGBA_DICI_M_21&collapse=month&representation_mode=percent_change&format=json',
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     selector: response => response.json(),
  //   }
  // )
  //   .pipe(take(1))
  //   .subscribe(series => {});

  return result;
}
