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
  const data = JSON.parse(localStorage.getItem("evp_data")) || require("../data/emptydata.json");

  const validation = validateComment(comment);
  if(validation.hasErrors){
    return {
      success: false,
      errors: validation.errors
    };
  }

  const commentId = generateId();
  const commentCreatedAt = dayjs.utc(new Date());

  const commentSnakeCase = {
    created_at: commentCreatedAt,
    content: comment.content,
    video_id: comment.videoId,
    user_id: comment.userId,
    id: commentId
  };

  const commentCamelCase = {
    createdAt: commentCreatedAt,
    content: comment.content,
    videoId: comment.videoId,
    userId: comment.userId,
    id: commentId
  };

  data.comments.push(commentSnakeCase);

  const video = data.videos.find(v => v.id === comment.videoId);
  video.num_comments++;

  localStorage.setItem("evp_data", JSON.stringify(data));

  return {
    success: true,
    comment: commentCamelCase
  }
};

export default createComment;