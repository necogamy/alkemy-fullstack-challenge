const { Pool } = require('pg');
require('dotenv').config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const proConfig = process.env.DATABASE_URL;

const config = {
    connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig
}
if (process.env.NODE_ENV === 'production') config.ssl = { rejectUnauthorized: false };

const db = new Pool(config);

module.exports = db;