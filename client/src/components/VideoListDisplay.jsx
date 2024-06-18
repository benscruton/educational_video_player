import { useState, useEffect } from "react";
import axios from "axios"
import { logoIcon } from "../static/img";
import { Link } from "react-router-dom";

const VideoListDisplay = ({video}) => {
  const [previewUrl, setPreviewUrl] = useState(logoIcon);

  useEffect(() => {
    axios.get(
      `https://noembed.com/embed?url=${video.video_url}`
    )
      .then(rsp => {
        console.log(rsp.data);
        setPreviewUrl(rsp.data?.thumbnail_url || logoIcon);
      })
      .catch(e => console.log(e));
  }, [video.video_url]);

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