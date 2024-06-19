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
      <h2 className = "has-text-centered is-size-2">
        {video ? video.title : "Loading..."}
      </h2>

      {video ?
        <>
          <VideoPlayer url={video.videoUrl}/>

          <a
            href = {video.videoUrl}
            target = "_blank"
            rel = "noopener noreferrer"
          >
            Open video source
          </a>
        
          <VideoComments
            videoId = {videoId}
          />

          <p>
            <Link to = {`/users/${video.userId}`}>
              {"<--"} Back to all of <span className = "has-text-weight-bold">{video.userId}</span>'s videos
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