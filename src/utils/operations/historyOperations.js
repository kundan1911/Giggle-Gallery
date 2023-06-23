import { addToHistory,removeFromHistory,clearHistory } from "../../serverCalls/serverCalls";
export async function addToHistoryCall(video,encodedToken,setState){
    try {
        const response = await addToHistory(video,encodedToken);
        if(response){
          setState(response.data.history);
        }
      } catch (error) {
        console.log(error)
      }
};




export async function removeFromHistoryCall(video,encodedToken,setState){
    try {
        const response = await removeFromHistory(video,encodedToken);
        if(response){
          setState(response.data.history);
        }
      } catch (error) {
        console.log(error)
      }
};

export async function clearHistoryCall(encodedToken,setState){
    try {
        const response = await clearHistory(encodedToken);
        if(response){
          setState(response.data.history);
        }
      } catch (error) {
        console.log(error)
      }
};


