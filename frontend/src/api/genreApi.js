
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
//