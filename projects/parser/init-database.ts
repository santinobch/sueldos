import { Client } from 'pg';
import { take } from 'rxjs';
import initSqlJs, { Database } from 'sql.js/dist/sql-wasm';

import { csvToSql } from './csv-to-sql';

const SQL_CONFIG: Partial<EmscriptenModule> = {
  locateFile: filename => {
    return `node_modules/sql.js/dist/${filename}`;
  },
};

export function initDatabase() {
  const client = new Client({
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'salaries',
  });
  client.connect();

  csvToSql()
    .asObservable()
    .pipe(take(1))
    .subscribe(query => {
      console.log('Executing query');

      initSqlJs(SQL_CONFIG).then(function (SQL) {
        //Create the database
        const db = new SQL.Database();
        db.run(query);

        // // Prepare a statement
        // const stmt = db.prepare(
        //   'SELECT * FROM test WHERE col1 BETWEEN $start AND $end'
        // );
        // stmt.getAsObject({ $start: 1, $end: 1 }); // {col1:1, col2:111}

        // // Bind new values
        // stmt.bind({ $start: 1, $end: 2 });
        // while (stmt.step()) {
        //   //
        //   const row = stmt.getAsObject();
        //   console.log('Here is a row: ' + JSON.stringify(row));
        // }
      });

      client.query(query).finally(() => {
        console.log('Finished');
      });
    });
}
