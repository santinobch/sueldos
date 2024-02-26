import { Client } from 'pg';
import { csvToSql } from './csv-to-sql';

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
    .subscribe(result => {
      client.query(result);
    });
}
