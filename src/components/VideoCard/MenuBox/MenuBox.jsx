import { useAuthContext, useWatchLaterContext } from "../../../context/context";
import { FaTrash, ImClock, RiPlayListAddLine } from "../../../icons/icons";
import { isPresentInState } from "../../../utils/utilCalls";
import { addToWatchLaterCall, removeFromWatchLaterCall } from "../../../utils/utils";
export function MenuBox({ setStatePlaylistMenu, setStateMenu, video }) {
  const { userState } = useAuthContext();
  const {WatchLater,setWatchLater} = useWatchLaterContext()
  const isVideoInWatchLater = userState.id && isPresentInState(WatchLater, video);
  return (
    <div className="absolute inset-0 flex video-card-btns">
      {isVideoInWatchLater ? (
        <button onClick={()=>removeFromWatchLaterCall(video?._id,userState?.id,setWatchLater)} className="btn txt-sm plain-btn">
          <FaTrash />
          <span>Remove from WatchLater</span>
        </button>
      ) : (
        <button onClick={()=>addToWatchLaterCall(video,userState?.id,setWatchLater)} className="btn txt-sm plain-btn">
          <ImClock />
          <span>Add To WatchLater</span>
        </button>
      )}
      <button
        onClick={() => {
          setStatePlaylistMenu(true);
          setStateMenu(false);
        }}
        className="w-100 btn txt-sm plain-btn"
      >
        <RiPlayListAddLine className="icon" /> Add to playlist{" "}
      </button>
    </div>
  );
}
