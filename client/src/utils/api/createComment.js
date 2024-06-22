import axios from "axios";
import serverData from "../data/serverData";
import dayjs from "dayjs";

// POST to /videos/comments

const sampleDataFormat = {
  video_id: "string",
  content: "string",
  user_id: "string"
};

const validateComment = comment => {
  const errors = {};
  let hasErrors = false;

  if(!comment.videoId){
    hasErrors = true;
    errors.videoId = "Attribute video_id is missing";
  }
  if(!comment.content && !comment.content.trim()){
    hasErrors = true;
    errors.content = "Your comment is empty";
  }
  if(!comment.userId){
    hasErrors = true;
    errors.userId = "Attribute user_id is missing.";
  }

  return {errors, hasErrors};
};

const createComment = async comment => {
  const validation = validateComment(comment);
  if(validation.hasErrors){
    return {
      success: false,
      errors: validation.errors
    };
  }

  const snake_case_comment = {
    video_id: comment.videoId,
    user_id: comment.userId,
    content: comment.content
  };

  return axios.post(
    `${serverData.url}/videos/comments`,
    snake_case_comment
  )
    .then(() => {
      /*
        Like the Create Video endpoint, we don't
        get the object back as a response. We'll
        fetch it here so we can use the ID.
      */
      return axios.get(
        `${serverData.url}/videos/comments?video_id=${comment.videoId}`
      )
        .then(rsp => {
          const comments = rsp.data?.comments;
          comments.sort((a, b) =>
            dayjs(a.created_at) - dayjs(b.created_at)
          );
          const latestComment = comments[comments.length - 1];
          return {
            success: true,
            comment: {
              createdAt: latestComment.created_at,
              content: latestComment.content,
              userId: latestComment.user_id,
              videoId: latestComment.videoId,
              id: latestComment.id
            }
          };
        })
        .catch(e => {
          console.log(e);
          return {
            success: true,
            id: "?"
          };
        });
    })
    .catch(e => {
      console.log(e);
      return {
        succes: false,
        errors: {content: e}
      }; 
    });
};

export default createComment;