import { AiOutlineHome,MdOutlineExplore,MdOutlineVideoLibrary ,} from "../../icons/icons";
import "./MobileSidebar.css"
import {useNavigate,NavLink} from "react-router-dom";
const MobileSidebarData=[
  {
    id:1,
    navIcon: <AiOutlineHome className="icon size-xs" />,
    navTxt:"Home",
    navLink:"/",
  },
  {
    id:2,
    navIcon: <MdOutlineExplore className="icon size-xs" />,
    navTxt:"Explore",
    navLink:"/explore",
  },
  {
    id:3,
    navIcon: <MdOutlineVideoLibrary className="icon size-xs" />,
    navTxt:"Library",
    navLink:"/library",
  },
]
function MobileSidebar() {
  return (
    <div className="flex mobile-sidebar-container">
    {MobileSidebarData.map(({ navLink, id, navIcon, navTxt }) => (
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
export { MobileSidebar };
