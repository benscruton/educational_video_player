import { useContext, useEffect, useState } from "react";
import { getVideoComments } from "../utils/api";
import { CommentForm, CommentBox } from "../components";
import { AppContext } from "../context";


const VideoComments = ({videoId}) => {
  const {serverUrl} = useContext(AppContext);

  const [comments, setComments] = useState(null);

  useEffect(() => {
    getVideoComments(videoId, serverUrl)
      .then(videoComments => {
        setComments(videoComments);
      })
      .catch(e => console.log(e));
  }, [videoId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h2 className = "is-size-3 has-text-centered">
        Comments
      </h2>

      {comments ?
        comments.map(c => 
          <CommentBox
            key = {c.id}
            comment = {c}
          />
        )
        :
        "Loading..."
      }

      <CommentForm
        videoId = {videoId}
        comments = {comments}
        setComments = {setComments}
      />
    </>
  );
};

export default VideoComments;