import "./VideoCard.css";
import { BsThreeDotsVertical, FaTrash } from "../../icons/icons";
import { useNavigate, useLocation,useParams } from "react-router-dom";
import { useState } from "react";
import { AddToPlaylistBox } from "../components";
import { MenuBox } from "./MenuBox/MenuBox";
import {
  useAuthContext,
  useHistoryContext,
  useVideoContext,
  useLikesContext,
  useWatchLaterContext,
} from "../../context/context";
import {
  removeLikedVideoCall,
  removeFromHistoryCall,
  removeFromWatchLaterCall,
  removeVideoFromPlaylistCall,
} from "../../utils/utils";

function VideoCard({ videoDetails, MenuBoxItem = MenuBox, MenuBtn }) {
  const location = useLocation();
  const {dispatch}= useVideoContext();
  const { userState } = useAuthContext();
  const { setHistory } = useHistoryContext();
  const { setLikes } = useLikesContext();
  const { setWatchLater } = useWatchLaterContext();
  const { playlistId } = useParams();

  const deleteBtnHandler = () => {
    if (location.pathname === "/history") {
      removeFromHistoryCall(videoDetails?._id, userState?.id, setHistory);
    } else if (location.pathname === "/liked-videos") {
      removeLikedVideoCall(videoDetails?._id, userState?.id, setLikes);
    } else if (location.pathname === "/watchLater") {
      removeFromWatchLaterCall(videoDetails?._id, userState?.id, setWatchLater);
    }else{
      removeVideoFromPlaylistCall(playlistId,videoDetails?._id,userState?.id,dispatch);
    }
  };
  const [ShowMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  return (
    <div className="video-card short-card">
      <div className="w-100 h-100 video-img-container">
        <img
          onClick={() => navigate(`/videos/${videoDetails._id}`)}
          src={videoDetails.img}
          className="res"
          alt="video Image"
        />
      </div>
      <div className="relative flex video-details">
        {videoDetails.logo && (
          <div className="avatar-container size-sm ">
            <img
              src={videoDetails.logo}
              alt={`logo of ${videoDetails.creator}`}
            />
          </div>
        )}
        {!videoDetails.logo && (
          <div className="flex avatar-container size-sm txt-avatar ">
            <span>{videoDetails.creator.split("")[0]}</span>
          </div>
        )}
        <div className=" flex video-desc-box">
          <p className="video-title">{videoDetails.title}</p>
          <p className="creator-name">~{videoDetails.creator}</p>
        </div>
        {!MenuBtn && (
          <BsThreeDotsVertical
            onClick={() => setShowMenu((prev) => !prev)}
            className="icon size-xs video-menu-btn"
          />
        )}

        {MenuBtn && (
          <div className="menu-icon-box" onClick={deleteBtnHandler}>
            <FaTrash className="icon size-xs" />
          </div>
        )}
        {ShowMenu && (
          <MenuBoxItem
            video={videoDetails}
            setStatePlaylistMenu={setShowPlaylistMenu}
            setStateMenu={setShowMenu}
          />
        )}
      </div>
      {showPlaylistMenu && (
        <AddToPlaylistBox
          video={videoDetails}
          setShowPlaylistMenu={setShowPlaylistMenu}
        />
      )}
    </div>
  );
}

export { VideoCard };
