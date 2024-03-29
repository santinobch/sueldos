import { parse } from 'csv';
import fs from 'fs';
import { Subject, take } from 'rxjs';

import { Dataset, IndecSeries } from './scripts/interfaces';
import { objectToSql, parseColumns } from './scripts/parsers';

export function csvToSql() {
  let dataset: Dataset[] = [];

  const result: Subject<string> = new Subject<string>();

  console.log('Converting Dataset to object');

  // Parse sysarmy dataset
  fs.createReadStream('projects/parser/data/2023.07_Sysarmy_Dataset.csv')
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row: string[]) => {
      parseColumns(row, dataset, new Date('Jul 01 2023'));
    })
    .on('end', () => {
      // Saving to file to have in hand
      console.log('Saving object as JSON');
      fs.writeFile(
        'dist/parser/JSONs/2023.07_Sysarmy_Dataset.json',
        JSON.stringify(dataset),
        error => {
          if (error) console.log(error);

          console.log('Converting object to SQL query');
          result.next(objectToSql(dataset));
          result.complete();
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
