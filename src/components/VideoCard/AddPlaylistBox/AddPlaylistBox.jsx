import "./AddPlaylistBox.css";
import { AiOutlineCloseCircle } from "../../../icons/icons";
import { useVideoContext, useAuthContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";
import {
  addPlaylistHandler,
  addVideoToPlaylistCall,
  removeVideoFromPlaylistCall,
} from "../../../utils/utils";
import {useClickOutside,useInputHandler } from "../../../hooks/customHooks";
import { isPresentInState } from "../../../utils/utilCalls";

function AddToPlaylistBox({ setShowPlaylistMenu, video=""}) {
  const navigate = useNavigate();
  const { userState } = useAuthContext();
  const { videoStates, dispatch } = useVideoContext();
  const { playlists } = videoStates;
  const { inputState, inputUpdate, setInputState } = useInputHandler({
    title: "",
    description: "",
  });

  const newPlaylistHandler = (e) => {
    e.preventDefault();

    if (!playlists.some((item) => item.title === inputState.title)) {
      addPlaylistHandler(inputState, userState?.id, dispatch);
      setInputState({ title: "" });
    }
  };
  const checkBoxHandler = (e, playlistItem) => {
    if(video){
      e.target.checked
      ? addVideoToPlaylistCall(playlistItem?._id, video, userState.id, dispatch)
      : removeVideoFromPlaylistCall(
        playlistItem?._id,
        video._id,
        userState?.id,
        dispatch
        );
      }else{
        console.log('no videos selected to add');
      }
  };
 
  
 const elementRef = useClickOutside(()=>setShowPlaylistMenu(false))
  

  return (  
    <div ref={elementRef} className="grid overlay-box">
      <div className="flex add-playlist-box txt-sm">
        <li className="flex icon-box">
          <span className="txt-md"> Save to... </span>
          <AiOutlineCloseCircle
            className="icon icon-close "
            onClick={() => setShowPlaylistMenu(false)}
          />
        </li>
        <form
          onSubmit={(e) => newPlaylistHandler(e)}
          className="create-playlist-form"
        >
          <div className="flex txt-md playlist-list">
            {playlists?.map((playlistItem) => (
              <label key={playlistItem._id}>
                <input
                  type="checkbox"
                  onChange={(e) => checkBoxHandler(e, playlistItem)}
                  checked={ isPresentInState(playlistItem.videos, video)}
                  className="checkbox"
                />

                {playlistItem.title}
              </label>
            ))}
          </div>
          <input
            type="text"
            name="title"
            value={inputState.title}
            onChange={inputUpdate}
            className="playlist-input"
            required
            placeholder="Enter Playlist Name"
          />
          {userState.id ? (
            <button type="submit" className="btn btn-sm">
              Create
            </button>
          ) : (
            <button onClick={() => navigate("/login")} className="btn btn-sm">
              Create
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
export { AddToPlaylistBox };
