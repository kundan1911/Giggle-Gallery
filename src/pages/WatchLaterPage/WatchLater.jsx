import {
  Navbar,
  Sidebar,
  VideoCard,
  MobileSidebar,
} from "../../components/components";
import { useWatchLaterContext } from "../../context/context";
import { emptyImage2 } from "../../assets/images";
import { useScrollToTop } from "../../hooks/customHooks";
import {Link} from "react-router-dom";

export function WatchLater() {
  const { WatchLater } = useWatchLaterContext();
  useScrollToTop();
  return (
    <>
      <Navbar />
      <div className="top"></div>
      <main className="main-wrapper">
        <Sidebar />
        <MobileSidebar />
        <section className="content-wrapper">
          <div className="flex card-grid">
            {WatchLater?.map((video) => (
              <VideoCard key={video._id} videoDetails={video} MenuBtn={true} />
            ))}
            {WatchLater?.length === 0 && (
              <div className="flex empty-page-box">
                <h1 className="empty-page-title">
                  WatchLater Videos Is Currently Empty !
                </h1>
                <img
                  className="flex empty-page-image"
                  src={emptyImage2}
                  alt="empty WatchLater Videos"
                />
                <Link to="/explore">
                  <button className="btn btn-sm ">View Videos</button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
