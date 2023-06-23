import { emptyImage2 } from "../../assets/images";
import {  Navbar, Sidebar,MobileSidebar, VideoCard } from "../../components/components";
import { Link } from "react-router-dom";
import {useAuthContext, useHistoryContext } from "../../context/context";
import "./History.css";
import { useScrollToTop } from "../../hooks/customHooks";
import { clearHistoryCall } from "../../utils/utils";

export function History() {
  const {History,setHistory} = useHistoryContext()
  const {userState}=useAuthContext();
  const reversedHistory = [...History]?.reverse();
  useScrollToTop([History]);
  return (
    <>
      <Navbar />
      <div className="top"></div>
      {History?.length>0 && (<div className="flex"><div onClick={()=>clearHistoryCall(userState?.id,setHistory)} className="btn btn-xs plain-btn">Clear All</div></div>)}
    
      <main className="flex main-wrapper">
        <Sidebar />
        < MobileSidebar />
        <section className="content-wrapper">
          <div className="flex card-grid History-videos">
            {reversedHistory?.map((video) => (
              <VideoCard key={video._id} videoDetails={video} MenuBtn={true} />
            ))}
            {reversedHistory.length === 0 && (
              <div className="flex empty-page-box">
                <h1 className="empty-page-title">
                  History Is Currently Empty !
                </h1>
                <img
                  className="flex empty-page-image"
                  src={emptyImage2}
                  alt="empty History"
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
