// sets up the connection to the database
import "dotenv/config";
import pg from "pg";
const connectionString = process.env.DATABASE_URL;
const db = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
export default db;