const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'root',
  host: '74.208.42.176',
  database: 'prueba1',
  password: 'minacleo',
  port: 5432,
});

module.exports = {
  pool
}
