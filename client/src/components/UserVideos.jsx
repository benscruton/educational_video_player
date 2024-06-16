import { useState, useEffect } from "react";

import { getUserVideos } from "../utils/api";
import { VideoListDisplay } from "../components";

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
            videos.map(video =>
              <VideoListDisplay
                key = {video.id}
                video = {video}
              />
            )
            :
            "No videos found for this user."
          :
          "Loading..."
      }
    </>
  );
};

export default UserVideos;