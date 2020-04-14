const { Pool } = require('pg');

module.exports = new Pool({
  user: 'postgres',
  password: 'dalota',
  host: 'localhost',
  port: 5432,
  database: 'aulasparticulares',
})