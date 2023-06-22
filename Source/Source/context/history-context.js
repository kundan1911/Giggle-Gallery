import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useLocalStorageGetItem } from "../hooks/customHooks";
import { getHistory } from "../serverCalls/historyCalls";
const HistoryContext = createContext();
function HistoryProvider({ children }) {
  const [History, setHistory] = useState([]);
  const userToken=useLocalStorageGetItem("shed-video-token");
  
  useEffect(() => {
    (async () => {
      try {
        if (userToken) {
          const HistoryResponse = await getHistory(userToken);
          if (HistoryResponse) {
            setHistory(HistoryResponse.data.history);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <HistoryContext.Provider value={{History,setHistory}}>
      {children}
    </HistoryContext.Provider>
  );
}

const useHistoryContext = () => useContext(HistoryContext);
export { HistoryProvider, useHistoryContext };
