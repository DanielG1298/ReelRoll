
// fetch genres
export async function getGenres(){
    try{
        const response = await fetch ("/genre");
        const result = await response.json();
        console.log("Fetched genres:", result);
        return result;
    }catch(err){
        console.error(err);
    }return [];
}
//get genre by id 
export async function getGenreById(id){
    try{
        const response = await fetch ("/genre/" + id);
        const result = await response.json();
        return result;
    }catch(err){
        console.error(err);
    }return null;
};