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
        const commentReplies = [];
        for(let comment of videoComments){
          let isReply = false;
          let replyTo = null;
          let replyContent = null;
          try{
            const data = JSON.parse(comment.content);
            isReply = data.isReply;
            replyTo = data.replyTo;
            replyContent = data.content;
          }
          catch(e){}

          if(isReply && replyTo && replyContent){
            const parentComment = commentReplies.find(c => c.id === replyTo);
            if(parentComment){
              parentComment.replies.push({
                ...comment,
                content: replyContent
              });
            }
            else{
              commentReplies.push({
                ...comment,
                content: replyContent,
                replies: []
              });
            }
          }
          else{
            commentReplies.push({
              ...comment,
              replies: []
            });
          }
        }
        setComments(commentReplies);
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
            isReply = {false}
            videoId = {videoId}
            comments = {comments}
            setComments = {setComments}
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