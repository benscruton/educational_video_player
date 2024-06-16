import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getUserVideos } from "../utils/api";

const UserVideos = ({userId}) => {
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserVideos(userId)
      .then(rsp => {
        setVideos(rsp.data);
        setError(null);
      })
      .catch(e => {
        console.log(e);
        setError("Sorry, something went wrong.");
      });
  }, [userId]);

  return (
    <>
      <h2 className = "is-size-3 has-text-centered">
        Videos for user {userId}
      </h2>

      {error ? error :
        videos ?
          videos.length ?
            videos.map(v => {
              return (
                <p key={v.id}>
                  <Link to = {`/videos/${v.id}`}>
                    {v.title}
                  </Link>
                </p>
              );
            })
            :
            "No videos found for this user."
          :
          "Loading..."
      }
    </>
  );
};

export default UserVideos;