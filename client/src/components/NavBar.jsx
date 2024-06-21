import { useState } from "react";
import { Link } from 'react-router-dom';
import { logoWhite } from '../static/img';
import { TextIcon } from "../components";

const NavBar = ({
  userId,
  setUserId,
  setShowLoginModal
}) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  const logOut = () => {
    setUserId(null);
    localStorage.removeItem("evp_user_id");
    setIsMenuActive(false);
  };

  return (
    <nav
      className = "navbar is-danger mb-5"
      role = "navigation"
      aria-label = "main navigation"
    >
      <div className = "navbar-brand">
        <Link
          className = "navbar-item mr-4"
          to = "/"
        >
          <img
            src = {logoWhite}
            alt = "Learnwell logo"
          />
        </Link>

        <div
          className = {`navbar-burger has-text-white ${isMenuActive ? "is-active" : ""}`}
          role = "button"
          aria-label = "menu"
          aria-expanded = "false"
          onClick = {toggleMenu}
        >
          <span aria-hidden />
          <span aria-hidden />
          <span aria-hidden />
          <span aria-hidden />
        </div>
      </div>

      <div className = {`navbar-menu ${isMenuActive ? "is-active" : ""}`}>
        <div className = "navbar-start">
          <Link
            className = "navbar-item has-text-white"
            to = "/users"
            onClick = {() => setIsMenuActive(false)}
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
            onClick = {() => setIsMenuActive(false)}
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
              onClick = {() => setIsMenuActive(false)}
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
                  onClick = {() => {
                    setShowLoginModal(true);
                    setIsMenuActive(false);
                  }}
                >
                  <TextIcon
                    text = "Log In"
                    icon = "bi-box-arrow-in-right"
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;