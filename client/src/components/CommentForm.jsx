import { useContext, useState } from "react";
import { AppContext } from "../context";
import { createComment } from "../utils/api";

const CommentForm = ({
  videoId,
  comments,
  setComments
}) => {
  const {userId, serverUrl} = useContext(AppContext);

  const [inputContent, setInputContent] = useState("");
  const [inputError, setInputError] = useState("");

  const isDisabled = !userId;

  const handleChange = e => {
    setInputContent(e.target.value);
    setInputError("");
  };

  const addComment = e => {
    e.preventDefault();

    if(!inputContent){
      return setInputError("Your comment cannot be empty.");
    }

    createComment(
      {
        videoId,
        userId,
        content: inputContent
      },
      serverUrl
    )
      .then((result) => {
        if(!result.success){
          return setInputError(result?.errors?.content || "Sorry, something went wrong.");
        }
        setComments([...comments,
          result.comment
        ]);
        setInputContent("");
      })
      .catch(e => console.log(e));
  };

  return (
    <form
      className = "card"
      onSubmit = {addComment}
    >
      <header className = "card-header">
        <p className = "card-header-title">
          Add a comment
        </p>
      </header>

      <div className = "card-content">
        <div className = "content">
          {isDisabled ?
            <p className = "has-text-danger has-text-centered">
              Log in to leave a comment!
            </p>
            :
            <></>
          }
          <textarea
            className = {`textarea ${inputError ? "is-danger" : ""}`}
            onChange = {handleChange}
            value = {inputContent}
            disabled = {isDisabled}
          />
        </div>
        <p className = "help is-danger">
          {inputError}
        </p>

        <button
          className = "button is-success mt-3"
          type = "submit"
          disabled = {isDisabled}
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;