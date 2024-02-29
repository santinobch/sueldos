import { Client } from 'pg';

export const client = new Client({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 5432,
});
client.connect();
