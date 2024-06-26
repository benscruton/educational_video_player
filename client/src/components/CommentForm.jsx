import { useContext, useState } from "react";
import { AppContext } from "../context";
import { createComment } from "../utils/api";

const CommentForm = ({
  videoId,
  comments,
  setComments,
  isReply,
  replyTo,
  closeReply
}) => {
  const {userId, serverUrl} = useContext(AppContext);

  const [inputContent, setInputContent] = useState("");
  const [inputError, setInputError] = useState("");

  const isDisabled = !userId;

  const handleChange = e => {
    setInputContent(e.target.value);
    setInputError("");
  };

  // const addComment = e => {
  //   e.preventDefault();

  //   if(!inputContent){
  //     return setInputError("Your comment cannot be empty.");
  //   }

  //   const comment = {
  //     videoId,
  //     userId
  //   }

  //   if(isReply){
  //     comment.content = JSON.stringify({
  //       isReply,
  //       replyTo,
  //       content: inputContent
  //     });
  //     setComments(comments.map(c => {
  //       if(c.id !== replyTo) return c;
  //       return {
  //         ...c,
  //         replies: [
  //           ...c.replies,
  //           {
  //             ...comment,
  //             content: inputContent
  //           }
  //         ]
  //       }
  //     }));
  //     closeReply();
  //   }

  //   else{
  //     comment.content = inputContent;
  //     setComments([
  //       ...comments,
  //       {...comment,
  //         replies: []
  //       }
  //     ]);
  //   }

  //   setInputContent("");
  // };

  const addComment = e => {
    e.preventDefault();

    if(!inputContent){
      return setInputError("Your comment cannot be empty.");
    }

    createComment(
      {
        videoId,
        userId,
        content: isReply && replyTo ?
          JSON.stringify({
            isReply,
            replyTo,
            content: inputContent
          })
          :
          inputContent
      },
      serverUrl
    )
      .then((result) => {
        if(!result.success){
          return setInputError(result?.errors?.content || "Sorry, something went wrong.");
        }
        if(isReply){
          setComments(comments.map(c => {
            if(c.id !== replyTo) return c;
            return {
              ...c,
              replies: [
                ...c.replies,
                {
                  ...result.comment,
                  content: inputContent
                }
              ]
            }
          }));
          closeReply();
        }
        else{
          setComments([...comments,
            {
              ...result.comment,
              replies: []
            }
          ]);
        }
        setInputContent("");
      })
      .catch(e => console.log(e));
  };

  return (
    <form
      className = "card mb-4"
      onSubmit = {addComment}
    >
      <header className = "card-header">
        <p className = "card-header-title">
          Add a {isReply ? "reply" : "comment"}
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
          className = "button is-success mt-1"
          type = "submit"
          disabled = {isDisabled}
        >
          Post
        </button>
        {
          isReply ?
            <button
              className = "button is-danger mt-1 ml-2"
              onClick = {closeReply}
            >
              Cancel
            </button>
            :
            <></>
        }
      </div>
    </form>
  );
};

export default CommentForm;