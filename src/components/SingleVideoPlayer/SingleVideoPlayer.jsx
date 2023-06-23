import "./SingleVideoPlayer.css";
import ReactPlayer from "react-player/youtube";
import { useVideoContext, useAuthContext ,useHistoryContext} from "../../context/context";
import { addToHistoryCall } from "../../utils/utils";
import { useScrollToTop } from "../../hooks/customHooks";
export function SingleVideoPlayer({ videoId }) {
  const { videoStates } = useVideoContext();
  const {setHistory}=useHistoryContext()
  const { userState } = useAuthContext();
  const { videos } = videoStates;
  const foundVideo = videos?.find((video) => video._id === videoId);
  const videoPlayed = () => userState.id && addToHistoryCall(foundVideo, userState?.id, setHistory)
  useScrollToTop();
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        width="100%"
        height="100%"
        playing={true}
        light={foundVideo?.img}
        onStart={videoPlayed}
        url={`https://www.youtube.com/embed/${videoId}`}
        controls={true}
      />
    </div>
  );
}
