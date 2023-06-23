import {
  Navbar,
  Sidebar,
  VideoCard,
  MobileSidebar,
  Loading,
} from "../../components/components";
import { useVideoContext } from "../../context/context";
import { useState } from "react";
import { getCategorisedData, getShuffleArr } from "../../utils/utilCalls";
import { useScrollToTop } from "../../hooks/customHooks";

function VideoListing() {
  const { videoStates } = useVideoContext();
  const { videos, videosLoading, categories } = videoStates;
  const [category, setCategory] = useState("All");
  const categorisedVideos = getCategorisedData(videos, category);
  const shuffledArr = getShuffleArr(categorisedVideos);
  useScrollToTop();

  return (
    <>
      <Navbar />
      <div className="top"></div>
      <main className="main-wrapper">
        <Sidebar />
        <MobileSidebar/>
        <div className="content-wrapper">
          <div className=" chip-container">
            {categories?.map(({ _id, categoryName }) => (
              <button
                key={_id}
                onClick={() => setCategory(categoryName)}
                className="btn btn-xs chip"
              >
                {categoryName}
              </button>
            ))}
          </div>
          <div className="flex card-grid">
            {videosLoading ? (
              <Loading width="150px" height="150px" />
            ) : (
              shuffledArr?.map((video) => (
                <VideoCard key={video._id} videoDetails={video} />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export { VideoListing };
