import { useState, useEffect, useContext } from "react";

import { getUserVideos } from "../utils/api";
import { VideoListDisplay } from "../components";
import { AppContext } from "../context";

const UserVideos = ({profileUserId}) => {
  const {userId, serverUrl} = useContext(AppContext);
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserVideos(profileUserId, serverUrl)
      .then(result => {
        setVideos(result);
        setError(null);
      })
      .catch(e => {
        console.log(e);
        setError("Sorry, something went wrong.");
      });
  }, [profileUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h2 className = "is-size-3 has-text-centered mb-3">
        {userId && userId === profileUserId ?
          "My Videos"
          :
          `Videos for user ${profileUserId}`
        }
      </h2>

      <div className = "columns is-multiline is-centered is-mobile">
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
      </div>
    </>
  );
};

export default UserVideos;