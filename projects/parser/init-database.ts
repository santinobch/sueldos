import fs from 'fs';
import { take } from 'rxjs';
import initSqlJs, { Database } from 'sql.js/dist/sql-wasm';

import { csvToSql } from './csv-to-sql';

const SQL_CONFIG: Partial<EmscriptenModule> = {
  locateFile: filename => {
    return `node_modules/sql.js/dist/${filename}`;
  },
};

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
