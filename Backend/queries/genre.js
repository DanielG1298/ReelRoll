import db from '../client.js';

export async function createGenre(name){
    const sql = `
    INSERT INTO genres (name)
    VALUES ($1)
    RETURNING id, name`;
    const { rows: [genre] } = await db.query(sql, [name]);
    return genre;
}