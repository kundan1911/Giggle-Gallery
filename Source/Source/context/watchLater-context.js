import {
    createContext,
    useContext,
    useState,
    useEffect,
  } from "react";
import { useLocalStorageGetItem } from "../hooks/customHooks";
  import { getWatchLater } from "../serverCalls/watchLaterCalls";
  const WatchLaterContext = createContext();
  function WatchLaterProvider({ children }) {
    const [WatchLater, setWatchLater] = useState([]);
    const userToken=useLocalStorageGetItem("shed-video-token");
    useEffect(() => {
      (async () => {
        try {
          if (userToken) {
            const WatchLaterResponse = await getWatchLater(userToken);
            if (WatchLaterResponse) {
              setWatchLater(WatchLaterResponse.data.watchlater);
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);
  
    return (
      <WatchLaterContext.Provider value={{WatchLater,setWatchLater}}>
        {children}
      </WatchLaterContext.Provider>
    );
  }
  
  const useWatchLaterContext = () => useContext(WatchLaterContext);
  export { WatchLaterProvider, useWatchLaterContext };
  