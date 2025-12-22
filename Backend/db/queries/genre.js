import db from '../client.js';

//insert a new genre into the genre table while excluding duplicates genre names
export async function createGenre(name){
    const sql = `
    INSERT INTO genre (name)
    VALUES ($1)
    ON CONFLICT (name)
    DO UPDATE SET name = EXCLUDED.name
    RETURNING id, name`;
    const { rows: [genre] } = await db.query(sql, [name]);
    return genre;
}
