import { useContext, useEffect, useState } from "react";
import { createComment, getVideoComments } from "../utils/api";
import { CommentForm, CommentBox } from "../components";
import { AppContext } from "../context";


const VideoComments = ({videoId}) => {
  const {userId} = useContext(AppContext);

  const [comments, setComments] = useState(null);
  const [inputContent, setInputContent] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    getVideoComments(videoId)
      .then(videoComments => {
        setComments(videoComments);
      })
      .catch(e => console.log(e));
  }, [videoId]);

  const handleChange = e => {
    setInputContent(e.target.value);
    setInputError("");
  };

  const addComment = e => {
    e.preventDefault();

    createComment({
      videoId,
      userId,
      content: inputContent
    })
      .then((result) => {
        if(!result.success){
          return setInputError(result?.errors?.content || "Sorry, something went wrong.");
        }
        setComments([...comments,
          result.comment
        ]);
      })
      .catch(e => console.log(e));
  };

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
        error = {inputError}
        content = {inputContent}
        handleChange = {handleChange}
        handleSubmit = {addComment}
      />

      <button onClick = {() => console.log(comments)} className = "button is-danger">
        Log comments
      </button>
    </>
  );
};

export default VideoComments;