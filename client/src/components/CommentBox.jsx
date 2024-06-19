import { useContext } from "react";
import { AppContext } from "../context";
import { formatCommentTime } from "../utils";


const CommentBox = ({comment}) => {
  const {userId, userTimeZone} = useContext(AppContext);
  const isUserComment = userId === comment.userId;

  return (
    <div
      className = {`message has-background-light ${isUserComment ? "is-success" : "is-dark"}`}
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
        {comment.content}
      </div>
    </div>
  );
};

export default CommentBox;