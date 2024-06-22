import axios from "axios";

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

const createComment = async (comment, serverUrl) => {
  const validation = validateComment(comment);
  if(validation.hasErrors){
    return {
      success: false,
      errors: validation.errors
    };
  }

  return axios.post(
    `${serverUrl}/api/comments/${comment.videoId}`,
    {
      userId: comment.userId,
      content: comment.content
    }
  )
    .then(rsp => rsp.data)
    .catch(e => {
      console.log(e);
      return {
        succes: false,
        errors: {content: e.message}
      }; 
    });
};

export default createComment;