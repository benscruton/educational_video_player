import { useContext, useState } from "react";
import { AppContext } from "../context";
import { formatCommentTime } from "../utils";
import CommentForm from "./CommentForm";


const CommentBox = ({
  comment,
  isReply,
  videoId,
  comments,
  setComments
}) => {
  const {userId, userTimeZone} = useContext(AppContext);
  const isUserComment = userId === comment.userId;
  const [isEditingReply, setIsEditingReply] = useState(false);

  return (
    <div
      className = {`message ${isUserComment ? "is-success" : "is-dark"} ${isReply ? "has-background-white mt-4" : "has-background-light"}`}
    >
      <header className = "message-header">
        <p className = "has-text-white">
          {comment.userId} {isUserComment ? "(me)" : ""}&nbsp; &nbsp;
          <span className = "has-text-weight-light has-text-light is-size-7">
            {formatCommentTime(comment.createdAt, userTimeZone)}
          </span>
        </p>
      </header>
      <div className = "message-body">
        <p className = "mb-3">
          {comment.content}
        </p>

        {comment.replies?.map(reply =>
          <CommentBox
            key = {reply.id}
            comment = {reply}
            isReply = {true}
          />
        )}

        {!isReply && isEditingReply ?
          <div>
            <CommentForm
              videoId = {videoId}
              comments = {comments}
              setComments = {setComments}
              isReply = {true}
              replyTo = {comment.id}
              closeReply = {() => setIsEditingReply(false)}
            />
          </div>
          :
          <></>
        }

        {(!isReply && !isEditingReply) ?
          <button
            className = {`button ${isEditingReply ? "is-danger" : "is-dark"}`}
            onClick = {() => setIsEditingReply(true)}
          >
            Reply
          </button>
          :
          <></>
        }
      </div>
    </div>
  );
};

export default CommentBox;