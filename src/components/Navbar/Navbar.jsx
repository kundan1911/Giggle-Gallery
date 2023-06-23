import "./Navbar.css";
import "./Navbar-Media.css";
import { AiFillCloseCircle, BiSearch, FaUserAlt } from "../../icons/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/context";
const Navbar = ({ searchBarRequired = true }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();
  const [DropDown, setDropDown] = useState(false);
  const { userState, logOutUser } = useAuthContext();
  return (
    <>
      <section className="flex nav-section">
        <div className="flex h-100 logo-container">
          <span onClick={() => navigate("/")} className="logo">
          Giggle Gallery
          </span>
        </div>
        {searchBarRequired && (
          <div className="flex search-container ">
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
            />
            <div className="search-icon-container">
              <BiSearch className="search-btn" />
            </div>
          </div>
        )}
        {showSearchModal && (
          <div className="search-bar-modal">
            <div className="search-bar">
              <div className="search-bar-heading flex ">
                <span>What are you looking for?</span>
                <AiFillCloseCircle
                  onClick={() => setShowSearchModal(false)}
                  className="icon size-xs"
                />
              </div>
              <form className="search-bar-center flex">
                <input placeholder="Search Here" />
                <BiSearch className="mobile-search-btn icon size-xs" />
              </form>
            </div>
          </div>
        )}

        {searchBarRequired && (
          <div className="flex search-wrapper">
            <BiSearch
              onClick={() => setShowSearchModal(true)}
              className="mobile-search-btn icon size-xs"
            />
            <div
              onClick={() => setDropDown((prev) => !prev)}
              className="flex pointer relative icon-container"
            >
              <FaUserAlt className="user-icon icon size-xs" />
              {DropDown && (
                <div className="absoloute inset-0 profile-box">
                  {userState.id && (
                    <Link to="/login">
                      <button
                        onClick={() => {
                          logOutUser();
                          navigate("/");
                        }}
                        className="btn btn-xs"
                      >
                        LogOut
                      </button>
                    </Link>
                  )}
                  {!userState.id && (
                    <button
                      onClick={() => navigate("/login")}
                      className="btn btn-xs"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export { Navbar };
