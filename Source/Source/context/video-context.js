import { createContext, useContext, useEffect, useReducer } from "react";
import { videoReducer } from "../reducer/videoReducer";
import { getCategories, getVideos } from "../serverCalls/initialCalls";
const VideoContext = createContext();
function VideoProvider({ children }) {
  const [videoStates, dispatch] = useReducer(videoReducer, {
    videos: [],
    categories: [],
    playlists: [],
    videosLoading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const categoryResponse = await getCategories();
        if (categoryResponse) {
          dispatch({
            type: "SET_CATEGORIES",
            payload: categoryResponse,
          });
        }

        const videoResponse = await getVideos();
        if (videoResponse) {
          dispatch({
            type: "LOAD_VIDEOS",
            payload: videoResponse,
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <VideoContext.Provider value={{ videoStates, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
}

const useVideoContext = () => useContext(VideoContext);
export { VideoProvider, useVideoContext };
