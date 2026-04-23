const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'database', 'spp.db');
const SCHEMA_PATH = path.join(__dirname, '..', 'database', 'schema.sql');

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');

// Run schema on first connect
const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);

module.exports = db;
