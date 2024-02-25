import { Dataset, IndecSeries } from './interfaces';
import { parseColumns, parseEmptyStrings } from './parsers';
import fs from 'fs';
import { parse } from 'csv';
import { fromFetch } from 'rxjs/fetch';
import { take } from 'rxjs';
import { valuesExtractor, keysExtractor } from './objects';
import { EXAMPLE_DATASET } from './consts';
import { format } from 'sql-formatter';

let dataset: Dataset[] = [];

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
      }
    );
  })
  .on('error', (error: any) => {
    console.log(error.message);
  });

// Get inflation from INDEC
fromFetch<IndecSeries>(
  'https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELGBA_DICI_M_21&collapse=month&representation_mode=percent_change&format=json',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    selector: response => response.json(),
  }
)
  .pipe(take(1))
  .subscribe(series => {
    const keys = keysExtractor(dataset[0]);
    const values = valuesExtractor(EXAMPLE_DATASET);

    let query = `
    -- Table: public.sueldos

    -- DROP TABLE IF EXISTS public.sueldos;

    CREATE TABLE IF NOT EXISTS public.sueldos ( id SERIAL PRIMARY KEY,`;

    values!.forEach((value, i) => {
      let type = 'numeric';

      if (typeof value === 'string') {
        type = 'text';
      }

      query += `${keys![i]} ${type}, `;
    });

    query += `) `;

    dataset.forEach((row, i) => {
      let values = '';
      const extractedValues = valuesExtractor(row);

      extractedValues!.forEach((value, ii) => {
        if (ii - 1 === extractedValues!.length) {
          if (typeof value === 'string') {
            values += `'${value}'`;
          } else {
            values += `${value}`;
          }
        }
        if (typeof value === 'string') {
          values += `'${value}', `;
        } else {
          values += `${value}, `;
        }
      });

      query += `INSERT INTO public.sueldos VALUES (${values});`;
    });

    // Minified file
    fs.writeFile('./dist/queries/2023.07_query.min.sql', query, error => {
      if (error) console.log(error);
    });

    // Beautified file
    fs.writeFile(
      './dist/queries/2023.07_query.sql',
      format(query, { language: 'postgresql' }),
      error => {
        if (error) console.log(error);
      }
    );
  });
