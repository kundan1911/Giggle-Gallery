import {
    createContext,
    useContext,
    useState,
    useEffect,
  } from "react";
import { useLocalStorageGetItem } from "../hooks/customHooks";
  import { getLikes } from "../serverCalls/likeCalls";
  const LikesContext = createContext();
  function LikesProvider({ children }) {
    const [Likes, setLikes] = useState([]);
    const userToken=useLocalStorageGetItem("shed-video-token");
  
    useEffect(() => {
      (async () => {
        try {
          if (userToken) {
            const LikesResponse = await getLikes(userToken);
            if (LikesResponse) {
              setLikes(LikesResponse.data.likes);
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);
  
    return (
      <LikesContext.Provider value={{Likes,setLikes}}>
        {children}
      </LikesContext.Provider>
    );
  }
  
  const useLikesContext = () => useContext(LikesContext);
  export { LikesProvider, useLikesContext };
  