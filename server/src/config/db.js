const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFile = path.join(__dirname, '../../database/vaalilupaukset.db');
const schemaFile = path.join(__dirname, '../../database/schema.sql');
const seedFile = path.join(__dirname, '../../database/seed.sql');

const db = new sqlite3.Database(dbFile);

function runSqlFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, sql) => {
      if (error) {
        reject(error);
        return;
      }

      db.exec(sql, (execError) => {
        if (execError) {
          reject(execError);
          return;
        }

        resolve();
      });
    });
  });
}

async function initializeDatabase() {
  try {
    await runSqlFile(schemaFile);

    const row = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) AS count FROM elections', (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result?.count || 0);
      });
    });

    if (Number(row) === 0) {
      await runSqlFile(seedFile);
    }
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    throw error;
  }
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row);
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

module.exports = {
  db,
  initializeDatabase,
  all,
  get,
  run,
};
