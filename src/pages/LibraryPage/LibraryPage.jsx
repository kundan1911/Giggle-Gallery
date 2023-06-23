import {
  Navbar,
  MobileSidebar,
  Sidebar,
  VideoCard,
  PlaylistPageCard,
} from "../../components/components";
import "./LibraryPage.css";
import { useNavigate } from "react-router-dom";
import {
  FaHistory,
  ImClock,
  MdOutlineFeaturedPlayList,
  FaRegHeart,
} from "../../icons/icons";
import { useHistoryContext } from "../../context/history-context";
import { useLikesContext } from "../../context/likes-context";
import { useWatchLaterContext } from "../../context/watchLater-context";
import { useVideoContext } from "../../context/video-context";
export function LibraryPage() {
  const navigate = useNavigate();
  const { History } = useHistoryContext();
  const { Likes } = useLikesContext();
  const { WatchLater } = useWatchLaterContext();
  const { videoStates } = useVideoContext();
  const {playlists}=videoStates;
  const HistoryArr = [...History].reverse().slice(0, 6);

  return (
    <>
      <Navbar />
      <div className="top"></div>
      <main className="flex main-wrapper">
        <Sidebar />
        <MobileSidebar />
        <section className="content-wrapper library-content">
          <div
            className="flex pointer short-page-container"
          >
              <div className="short-video-card">
                {History?.length > 0
                  ? HistoryArr.map((HistoryItem) => (
                      <VideoCard key={HistoryItem._id} videoDetails={HistoryItem}  />
                    ))
                  : <p className="txt-sm">No videos present in History</p>}
            </div>
            <div onClick={()=>navigate("/history")} className="flex short-page-icon-box  ">
              <FaHistory className="icon size-xs " />
              <p  className="txt-sm short-page-title">History</p>
            </div>
          </div>
          <div
            
            className="flex pointer short-page-container"
          >
              <div className="short-video-card">
                {WatchLater?.length > 0
                  ? WatchLater.slice(0, 6).map((WatchLaterItem) => (
                      <VideoCard key={WatchLaterItem._id} videoDetails={WatchLaterItem}  />
                    ))
                  :  <p className="txt-sm">No videos present in watch later</p>}
            </div>
            <div onClick={()=>navigate("/watchLater")} className="flex short-page-icon-box  ">
              <ImClock className="icon size-xs " />
              <p  className="txt-sm short-page-title">Watch Later</p>
            </div>
          </div>
          <div
            className="flex pointer short-page-container"
          >
              <div className="short-video-card">
              {playlists?.length > 0 
                  ? playlists.slice(0, 3).map((playlistItem) => (
                      <PlaylistPageCard key={playlistItem._id} card={playlistItem} />
                    ))
                  :  <p className="txt-sm">No playlist available</p>}
            </div>
            <div onClick={()=>navigate("/playlists")} className="flex short-page-icon-box  ">
              <MdOutlineFeaturedPlayList className="icon size-xs " />
              <p  className="txt-sm short-page-title">Playlists</p>
            </div>
          </div>
          <div
          
            className="flex pointer short-page-container"
          >
              <div className="short-video-card">
                {Likes?.length > 0
                  ? Likes.slice(0, 6).map((LikesItem) => (
                      <VideoCard key={LikesItem._id} videoDetails={LikesItem}  />
                    ))
                  :  <p className="txt-sm">No videos is liked</p>}
            </div>
            <div onClick={()=>navigate("/liked-videos")} className="flex short-page-icon-box  ">
              <FaRegHeart className="icon size-xs " />
              <p  className="txt-sm short-page-title">Likes</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
