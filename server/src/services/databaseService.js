const db = require('../config/db');

async function getOverview() {
  const result = await db.query('SELECT 1');
  return result.rows[0];
}

module.exports = {
  getOverview,
};
