import "./PlaylistPageCard.css";
import { useNavigate} from "react-router-dom";
import { emptyImage1 } from "../../assets/images";
import { removePlaylistCall } from "../../utils/utils";;
import { RiPlayListAddLine,FaTrash } from "../../icons/icons";
import {useAuthContext, useVideoContext } from "../../context/context";
export function PlaylistPageCard({ card }) {
  const {userState}= useAuthContext();
  const {dispatch}=useVideoContext();
  const navigate = useNavigate();
  let cardImg;
  const playlistLength = card.videos.length;
  const playlistTitle = card.title;
  if (card.videos.length > 0) {
    cardImg = card.videos[0].img;
  } else {
    cardImg = emptyImage1
  }
  return (
    <div className="p-0 overflow-hidden relative card-overlay pointer ">
        <div className="img-overlay" >
          <img src={cardImg} alt="video" className="res" />
        </div>
        <div onClick={()=>navigate(`/playlists/${card._id}`)} className="card-overlay-content">
          <div className="h-100 flex content">
            <RiPlayListAddLine className="icon size-xs" />
            <h1>{playlistLength}</h1>
          </div>
        </div>
        <div className="flex space-between title-icon-box">
          <span className="title">{playlistTitle}</span>
            <button onClick={()=>removePlaylistCall(card._id,userState.id,dispatch)} className="btn txt-sm plain-btn">
              <FaTrash />
            </button>
        </div>
      </div>
  );
}
