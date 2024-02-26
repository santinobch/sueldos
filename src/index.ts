import { csvToSql } from './csv-to-sql';
import { initDatabase } from './init-database';

switch (process.argv[2]) {
  case 'csv-to-sql':
    csvToSql();
    break;

  case 'init-database':
    initDatabase();
    break;

  default:
    initDatabase();
    break;
}
