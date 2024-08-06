import { Injectable } from '@angular/core';

import initSqlJs, { Database } from 'sql.js/dist/sql-wasm';
import { SQL_CONFIG } from 'projects/consts';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  public DB!: Database;

  constructor() { }

  load() {
    initSqlJs(SQL_CONFIG).then(SQL => {
      console.log('Executing query');

      const DB = new SQL.Database();


      const dataPromise = fetch("/path/to/database.sqlite").then(res => res.arrayBuffer());
      const buf = await Promise.all(dataPromise)
      const db = new SQL.Database(new Uint8Array(buf));

      console.log('Finished');
    });

    
  }
}
