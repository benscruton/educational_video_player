import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  VideoComments,
  VideoPlayer
} from "../components";
import { getSingleVideo } from "../utils/api";

const VideoPage = () => {
  const [video, setVideo] = useState(null);
  const {videoId} = useParams();

useEffect(() => {
    getSingleVideo(videoId)
      .then(rsp => {
        setVideo(rsp.data);
      })
      .catch(e => console.log(e));
  }, [videoId]);

  return (
    <div className = "container">
      <h2>{video ? video.title : "Loading..."}</h2>

      {video ?
        <>
          <VideoPlayer url={video.video_url}/>
        
          <VideoComments />

          <p>
            <Link to = {`/users/${video.user_id}`}>
              {"<--"} Back to all of this user's videos
            </Link>
          </p>
        </>
        :
        <>Loading...</>
      }
    </div>
  );
};

export default VideoPage;