import { Client } from 'pg';
import { csvToSql } from './csv-to-sql';
import { take } from 'rxjs';

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
    .subscribe(result => {
      console.log('Executing query');
      client.query(result).finally(() => {
        console.log('Finished');
      });
    });
}
