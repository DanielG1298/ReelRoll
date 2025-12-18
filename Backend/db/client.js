// sets up the connection to the database
import pg from "pg";
const db = new pg.Client(process.env.DATABASE_URL);
export default db;