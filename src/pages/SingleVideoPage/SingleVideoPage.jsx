import "./SingleVideoPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, ImClock, RiPlayListAddLine } from "../../icons/icons";
import { useState } from "react";
import {
  Navbar,
  Sidebar,
  SingleVideoPlayer,
  AddToPlaylistBox,
  VideoCard,
  MobileSidebar,
} from "../../components/components";
import {
  getCategorisedData,
  getShuffleArr,
  findById,
  isPresentInState,
} from "../../utils/utilCalls";
import { useScrollToTop } from "../../hooks/customHooks";
import {
  useAuthContext,
  useWatchLaterContext,
  useLikesContext,
  useVideoContext,
} from "../../context/context";
import { likeHandler,watchLaterHandler } from "../../utils/utils";
export function SingleVideoPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { videoStates } = useVideoContext();
  const { userState } = useAuthContext();
  const { Likes, setLikes } = useLikesContext();
  const { WatchLater, setWatchLater } = useWatchLaterContext();
  const { videos } = videoStates;
  const foundVideo = findById(videos, videoId);
  const [showPlaylistForm, setPlaylistForm] = useState(false);
  const videoCategory = foundVideo?.category;
  const categorisedVideos = getCategorisedData(videos, videoCategory);
  const filteredVideos = categorisedVideos.filter(
    (item) => item._id !== foundVideo._id
  );
  const shuffledArr = getShuffleArr(filteredVideos);
  const alteredVideos = shuffledArr.slice(0, 3);
  const isVideoLiked = userState.id && isPresentInState(Likes, foundVideo);
  const isVideoPresentInWatchLater = userState.id && isPresentInState(WatchLater,foundVideo);
  useScrollToTop([foundVideo]);

  return (
    <>
      <Navbar />
      <div className="top"></div>
      <main className="main-wrapper">
        <Sidebar />
        <MobileSidebar/>
        <section className="video-content-wrapper">
          <div className="video-box">
            <SingleVideoPlayer videoId={videoId} />
            <p className="p-1 lt-bold single-video-title">
              {foundVideo?.title}
            </p>
            <span className="txt-sm creator-txt lt-bold ">
              ~{foundVideo?.creator}
            </span>
            <div className="flex icon-grp gap">
              <div
                onClick={() =>
                  userState.id
                    ? likeHandler(Likes, foundVideo, userState.id, setLikes)
                    : navigate("/login")
                }
                className="flex menu-icon-box"
              >
                <FaHeart
                  className={`icon size-xs ${isVideoLiked ? `present` : ""}`}
                />
                <span>{isVideoLiked ? `Liked` : `Like`}</span>
              </div>

              <div
                onClick={() =>
                  userState.id
                    ? watchLaterHandler(
                        WatchLater,
                        foundVideo,
                        userState.id,
                        setWatchLater
                      )
                    : navigate("/login")
                }
                className="flex menu-icon-box"
              >
                <ImClock className={`icon size-xs ${isVideoPresentInWatchLater ? `present` : ""}`} />
                <span>Watchlater</span>
              </div>
              <div
                onClick={() => setPlaylistForm(true)}
                className="flex menu-icon-box"
              >
                <RiPlayListAddLine className="icon size-xs" />
                <span>Save</span>
              </div>
              {showPlaylistForm && (
                <AddToPlaylistBox
                  setShowPlaylistMenu={setPlaylistForm}
                  video={foundVideo}
                />
              )}
            </div>
          </div>
          <div className="flex card-grid feature-videos">
            {alteredVideos.map((item) => (
              <VideoCard videoDetails={item} key={item._id} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
