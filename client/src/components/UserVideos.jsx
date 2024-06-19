import { useState, useEffect } from "react";

import { getUserVideos } from "../utils/api";
import { VideoListDisplay } from "../components";

const UserVideos = ({profileUserId}) => {
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserVideos(profileUserId)
      .then(result => {
        setVideos(result);
        setError(null);
      })
      .catch(e => {
        console.log(e);
        setError("Sorry, something went wrong.");
      });
  }, [profileUserId]);

  return (
    <>
      <h2 className = "is-size-3 has-text-centered">
        Videos for user {profileUserId}
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