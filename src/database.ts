import { Client } from 'pg';

const client = new Client({
  user: '',
  password: '',
});
client.connect();
