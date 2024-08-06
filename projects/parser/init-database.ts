import fs from 'fs';
import { take } from 'rxjs';
import initSqlJs, { Database } from 'sql.js/dist/sql-wasm';

import { SQL_CONFIG } from '../consts';
import { csvToSql } from './csv-to-sql';

export function initDatabase() {
  csvToSql()
    .asObservable()
    .pipe(take(1))
    .subscribe(query => {
      initSqlJs(SQL_CONFIG).then(SQL => {
        console.log('Executing query');

        const DB = new SQL.Database();
        const DATA = DB.run(query).export();

        console.log('Saving database into a file');

        const BUFFER = Buffer.from(DATA);
        fs.writeFileSync('dist/database.sqlite', BUFFER);

        console.log('Finished');
      });
    });
}
