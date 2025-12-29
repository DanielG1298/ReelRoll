import bcrypt from 'bcrypt';
import db from '../client.js';

export async function createUser({ username, password, email }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
    INSERT INTO users (username, password_hash, email)
    VALUES ($1, $2 , $3)
    RETURNING id, username`;
    const { rows: [user] } = await db.query(sql, [username, hashedPassword, email]);
    return user;
}

export async function getUserByUsernameAndPassword (username, password){
    const sql = `
    SELECT id, username, email, password_hash
    FROM users WHERE username = $1`;
    const {rows: [user] } = await db.query(sql, [username]);
    if (!user) return null;
    const validpass = await bcrypt.compare(password, user.password_hash);
    if (!validpass) return null;
    return user;

}
export async function getUserById (id){
    const sql = `
    SELECT id, username, email
    FROM users WHERE id = $1`;
    const {rows: [user] } = await db.query(sql, [id]);
    return user;
}

export async function getUserByEmail (email){
    const sql =`
    SELECT * FROM users WHERE email = $1`;
    const {rows: [user]} = await db.query (sql, [email]);
    return user;
}

export async function deleteUser(id){
    const sql = `
    SELECT * FROM users WHERE id = $1
    DELETE FROM users WHERE id = $1
    RETURNING id, username`;
    const { rows: [user] } = await db.query(sql, [id]);
    return user;
}