import {
  AiOutlineHome,
  MdOutlineExplore,
  FaHistory,
  MdOutlineFeaturedPlayList,
  FaRegHeart,
  ImClock,
} from "../../icons/icons";
import "./Sidebar.css";
import {  NavLink } from "react-router-dom";
const sidebarData = [
  {
    id: 1,
    navIcon: <AiOutlineHome className="icon size-xs" />,
    navTxt: "Home",
    navLink: "/",
  },
  {
    id: 2,
    navIcon: <MdOutlineExplore className="icon size-xs" />,
    navTxt: "Explore",
    navLink: "/explore",
  },
  {
    id: 3,
    navIcon: <MdOutlineFeaturedPlayList className="icon size-xs" />,
    navTxt: "Playlist",
    navLink: "/playlists",
  },
  {
    id: 5,
    navIcon: <FaHistory className="icon size-xs clock-icon" />,
    navTxt: "History",
    navLink: "/history",
  },
  {
    id: 6,
    navIcon: <FaRegHeart className="icon size-xs" />,
    navTxt: "Likes",
    navLink: "/liked-videos",
  },
  {
    id: 7,
    navIcon: <ImClock className="icon size-xs clock-icon" />,
    navTxt: "WatchLater",
    navLink: "/watchLater",
  },
];
function Sidebar() {
  return (
    <div className="flex sidebar-container">
      {sidebarData.map(({ navLink, id, navIcon, navTxt }) => (
        <NavLink
        to={navLink}
        key={id}
          className={({ isActive }) => (isActive ? "active" : "")}>
          <div className="flex sidebar-icon-container">
            {navIcon}
            <span className="lt-bold nav-icon-txt">{navTxt}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export { Sidebar };
