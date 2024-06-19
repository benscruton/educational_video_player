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
      .then(video => {
        setVideo(video);
      })
      .catch(e => console.log(e));
  }, [videoId]);

  return (
    <div className = "container">
      <h2>
        {video ? video.title : "Loading..."}
      </h2>

      {video ?
        <>
          <VideoPlayer url={video.video_url}/>

          <a
            href = {video.video_url}
            target = "_blank"
            rel = "noopener noreferrer"
          >
            Open video source
          </a>
        
          <VideoComments
            videoId = {videoId}
          />

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