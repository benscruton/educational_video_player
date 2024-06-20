import React from "react";
import { Link } from 'react-router-dom';
import { logoWhite } from '../static/img';
import { TextIcon } from "../components";

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
            <TextIcon
              text = "Find User Videos"
              icon = "bi-search"
              iconClasses = "is-size-5"
            />
          </Link>

          <Link
            className = "navbar-item has-text-white"
            to = "/videos"
          >
            <TextIcon
              text = "Add Video"
              icon = "bi-plus-lg"
              iconClasses = "is-size-5"
            />
          </Link>

          {userId ?
            <Link
              className = "navbar-item has-text-white"
              to = {`/users/${userId}`}
            >
              <TextIcon
                text = "My Videos"
                icon = "bi-person-video2"
                iconClasses = "is-size-5"
              />
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
                  <TextIcon
                    text = "Log out"
                    icon = "bi-box-arrow-right"
                  />
                </div>
                :
                <div
                  className = "button is-primary has-text-white"
                  onClick = {() => setShowLoginModal(true)}
                >
                  <TextIcon
                    text = "Log In"
                    icon = "bi-box-arrow-in-right"
                  />
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