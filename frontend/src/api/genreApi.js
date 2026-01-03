
// fetch genres
export async function getGenres(){
    try{
        const response = await fetch ("/genres");
        const result = await response.json();
        return result;
    }catch(err){
        console.error(err);
    }return [];
}
//get genre by id 
export async function getGenreById(id){
    try{
        const response = await fetch ("/genres/" + id);
        const result = await response.json();
        return result;
    }catch(err){
        console.error(err);
    }return null;
};