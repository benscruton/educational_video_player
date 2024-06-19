import { useContext } from "react";
import { AppContext } from "../context";
import { formatCommentTime } from "../utils";


const CommentBox = ({comment}) => {
  const {userId, userTimeZone} = useContext(AppContext);
  const isUserComment = userId === comment.user_id;

  return (
    <div
      className = {`message has-background-light ${isUserComment ? "is-success" : "is-dark"}`}
    >
      <header className = "message-header">
        <p className = "card-header-title has-text-white">
          {comment.user_id} {isUserComment ? "(me)" : ""}&nbsp; &nbsp;
          <span className = "has-text-weight-light has-text-light is-size-7">
            {formatCommentTime(comment.created_at, userTimeZone)}
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