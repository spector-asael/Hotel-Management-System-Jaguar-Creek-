import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.on('connect', ()=>{
    console.log('Connected to the database');
})

pool.on('error', (err: Error)=>{
    console.error('Error connecting to the database', err);
})

export default pool
