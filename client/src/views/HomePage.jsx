import { Link } from "react-router-dom";
import { logoIcon } from "../static/img";
import { useContext } from "react";
import { AppContext } from "../context";

const HomePage = () => {
  const {userId} = useContext(AppContext);

  return (
    <div className = "container px-1">
      <h1 className = "is-size-1 has-text-centered">
        Welcome to Learnwell!
      </h1>

      <div className = "has-text-centered">
        <img
          src = {logoIcon}
          alt = "Learnwell logo"
          className = "is-centered"
        />
      </div>

      <h2 className = "is-size-5 has-text-centered">
        A video platform to save, view, and comment on educational videos.
      </h2>

      <hr />

      <p>
        To get started:
      </p>
      <div className = "content">
        <ul>
          <li>
            <Link to = "/users">Search for a user</Link> to find videos they have added, or
          </li>
          <li>
            {userId ? "" : "Log in (top right corner) and"} <Link to = "/videos">{userId ? "A" :"a"}dd your own videos</Link> to start your own collection.
          </li>
        </ul>
      </div>

      <p>
        Please note that some video platforms may require you to interact with a video before you will be able to use the video controls.
      </p>

      <h2 className = "is-size-4 has-text-centered mt-3">
        Happy learning!
      </h2>
    </div>
  );
};

export default HomePage;