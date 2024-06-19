// POST to /videos/comments

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import generateId from "./generateId";
dayjs.extend(utc);

const sampleDataFormat = {
  video_id: "string",
  content: "string",
  user_id: "string"
};

const validateComment = comment => {
  const errors = {};
  let hasErrors = false;

  if(!comment.video_id){
    hasErrors = true;
    errors.videoId = "Attribute video_id is missing";
  }
  if(!comment.content && !comment.content.trim()){
    hasErrors = true;
    errors.content = "Your comment is empty";
  }
  if(!comment.user_id){
    hasErrors = true;
    errors.user_id = "Attribute user_id is missing.";
  }

  return {errors, hasErrors};
};

const createComment = async comment => {
  const data = JSON.parse(localStorage.getItem("evp_data")) || require("../data/emptydata.json");

  const validation = validateComment(comment);
  if(validation.hasErrors){
    return {
      success: false,
      errors: validation.errors
    };
  }

  const newComment = {
    created_at: dayjs.utc(new Date()),
    content: comment.content,
    video_id: comment.video_id,
    user_id: comment.user_id,
    id: generateId()
  };

  data.comments.push(newComment);

  const video = data.videos.find(v => v.id === comment.video_id);
  video.num_comments++;

  localStorage.setItem("evp_data", JSON.stringify(data));

  return {
    success: true,
    comment: newComment
  }
};

export default createComment;