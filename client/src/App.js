import "bulma/css/bulma.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import jstz from "jstz";

import {
  LoginModal,
  NavBar
} from "./components";
import {
  AddVideo,
  HomePage,
  UserPage,
  VideoPage
} from "./views";
import {AppContext} from "./context";

function App() {
  const [userId, setUserId] = useState(
    localStorage.getItem("evp_user_id") || null
  );
  const [userTimeZone, setUserTimeZone] = useState(
    localStorage.getItem("evp_timezone") || null
  );

  const [showLoginModal, setShowLoginModal] = useState(false);

  // Get user time zone
  useEffect(() => {
    if(!userTimeZone){
      console.log("Getting time zone...");
      const timezone = jstz.determine();
      setUserTimeZone(timezone.name());
      localStorage.setItem("evp_timezone", timezone.name());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider
      value = {{
        userId,
        setUserId,
        userTimeZone
      }}
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

          <Routes>
            <Route
              path = "/"
              element = {<HomePage />}
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
