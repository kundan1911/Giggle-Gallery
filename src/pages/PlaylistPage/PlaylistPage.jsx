import { emptyImage2 } from "../../assets/images";
import { Navbar, Sidebar, PlaylistPageCard,MobileSidebar, AddToPlaylistBox } from "../../components/components";
import { useVideoContext } from "../../context/context";
import { useScrollToTop } from "../../hooks/customHooks";
import { useState } from "react";
export function Playlist() {
  const { videoStates } = useVideoContext();
  const { playlists } = videoStates;
  const [showAddPlaylistBox,setShowAddPlaylistBox]=useState(false);
  useScrollToTop();
  return (
    <>
      <Navbar />
      <div className="top"></div>
      <main className="main-wrapper">
        <Sidebar />
        <MobileSidebar/>
        <div className="content-wrapper">
          <section className="flex card-grid">
            {playlists?.map((playlistItem) => (
              <PlaylistPageCard key={playlistItem._id} card={playlistItem} />
            ))}
            {playlists?.length === 0 && (
              <div className="flex empty-page-box">
                <h1 className="empty-page-title">YOU HAVE 0 PLAYLISTS !</h1>
                <img
                  className="flex empty-page-image"
                  src={emptyImage2}
                  alt="empty playlist"
                />
                  <button className="btn btn-sm plain-btn" onClick={()=>setShowAddPlaylistBox(true)} >Add Playlists</button>
                { showAddPlaylistBox && <AddToPlaylistBox setShowPlaylistMenu={setShowAddPlaylistBox} />}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
