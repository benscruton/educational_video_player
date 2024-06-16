import "bulma/css/bulma.min.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import {
  LoginModal,
  NavBar
} from "./components";
import {
  AddVideo,
  UserPage,
  VideoPage
} from "./views";
import {AppContext} from "./context";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("evp_user_id") || "ben_scruton");

  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <AppContext.Provider
      value = {{userId, setUserId}}
    >
      <div className = "has-background-white">
        <Router>
          {showLoginModal &&
            <LoginModal
              setShowLoginModal = {setShowLoginModal}
              setUserId = {setUserId}
            />
          }
          <NavBar
            userId = {userId}
            setUserId = {setUserId}
            setShowLoginModal = {setShowLoginModal}
          />

          <p>hello this is App.js</p>

          <Routes>
            <Route
              path = "/"
              element = {<>home page</>}
            />

            <Route
              path = "/users"
              element = {<UserPage />}
            />

            <Route
              path = "/users/:profileUserId"
              element = {<UserPage />}
            />

            <Route
              path = "/videos/:videoId"
              element = {<VideoPage />}
            />

            <Route
              path = "/videos"
              element = {<AddVideo />}
            />
   
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
