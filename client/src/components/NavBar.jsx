import React from "react";
import { Link } from 'react-router-dom';
import { logoWhite } from '../static/img';

const NavBar = ({
  userId,
  setUserId,
  setShowLoginModal
}) => {
  const logOut = () => {
    setUserId(null);
    localStorage.removeItem("evp_user_id");
  };

  return (
    <nav
      className = "navbar is-danger mb-5"
      role = "navigation"
      aria-label = "main navigation"
    >
      <div className = "navbar-brand mr-4">
        <div className = "navbar-item">
          <img
            src = {logoWhite}
            alt = "Learnwell logo"
          />
        </div>
      </div>

      <div className = "navbar-menu">
        <div className = "navbar-start">
          <Link
            className = "navbar-item has-text-white"
            to = "/users"
          >
            Find User Videos
          </Link>

          <Link
            className = "navbar-item has-text-white"
            to = "/videos"
          >
            Add Video
          </Link>

          {userId ?
            <Link
              className = "navbar-item has-text-white"
              to = {`/users/${userId}`}
            >
              My videos
            </Link>
            :
            <></>
          }

        </div>

        <div className = "navbar-end">
          {userId &&
            <div className = "navbar-item has-text-white">
              Hello {userId}!
            </div>
          }
          <div className = "navbar-item">
            <div className = "buttons">
              {userId ?
                <div
                  className = "button is-warning"
                  onClick = {logOut}
                >
                  Log out
                </div>
                :
                <div
                  className = "button is-primary"
                  onClick = {() => setShowLoginModal(true)}
                >
                  Log In
                </div>
              }

              <button
                className = "button is-warning"
                onClick = {() => {
                  const evpData = JSON.parse(localStorage.getItem("evp_data"));
                  evpData.videos.pop();
                  localStorage.setItem("evp_data", JSON.stringify(evpData));
                }}
              >
                Remove Latest Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;