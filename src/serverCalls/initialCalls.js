import axios from "axios"
export async function getVideos(){
    try {
        const response = await axios.get("/api/videos") 
        if(response.status==200){
            return response.data.videos;
        }
    } catch (error) {
     console.log(error);
    }
}

export async function getCategories(){
    try {
        const response = await axios.get("/api/categories") 
        if(response.status==200){
            return response.data.categories;
        }
    } catch (error) {
     console.log(error);
    }
}

