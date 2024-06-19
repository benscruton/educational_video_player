import { useState, useEffect } from "react";
import axios from "axios"
import { logoIcon } from "../static/img";
import { Link } from "react-router-dom";
import { getThumbnailUrl } from "../utils";

const VideoListDisplay = ({video}) => {
  const [previewUrl, setPreviewUrl] = useState(logoIcon);

  useEffect(() => {
    getThumbnailUrl(video.videoUrl)
      .then(result => {
        console.log(result);
        if(result.success){
          setPreviewUrl(result.thumbnailUrl)
        }
      })
  }, [video.videoUrl]);

  return (
    <>
      <img
        src = {previewUrl}
        alt = {`Thumbnail for ${video.title}`}
      />
      <p>
        <Link to = {`/videos/${video.id}`}>
          {video.title}
        </Link>
      </p>
    </>
  );
};

export default VideoListDisplay;