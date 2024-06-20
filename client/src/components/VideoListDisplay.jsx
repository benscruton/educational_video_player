import { useState, useEffect } from "react";
import { videoIcon } from "../static/img";
import { Link } from "react-router-dom";
import { getThumbnailUrl } from "../utils";

const VideoListDisplay = ({video}) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    getThumbnailUrl(video.videoUrl)
      .then(result => {
        if(result.success){
          setPreviewUrl(result.thumbnailUrl);
        }
      })
  }, []);

  return (
    <div className = "column is-6-tablet is-4-desktop is-3-widescreen">
      <Link
        className = "card mx-2"
        to = {`/videos/${video.id}`}
      >
        <header className = "card-header has-background-info">
          <p className = "card-header-title is-centered is-size-5">
            {video.title}
          </p>
        </header>

        <div className = "card-image has-background-light">
          <figure className = "image">
            <img
              src = {previewUrl || videoIcon}
              alt = {`Thumbnail for ${video.title}`}
            />
          </figure>
        </div>

        <div className = "card-content has-background-light">
          <p>
            {video.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default VideoListDisplay;