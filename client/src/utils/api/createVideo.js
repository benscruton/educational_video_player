import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {generateId} from ".";
import ReactPlayer from "react-player";

// Post to /videos

const sampleDataFormat = {
  user_id: "string",
  description: "string",
  video_url: "string",
  title: "string"
}

const validateVideo = video => {
  const errors = {};
  let hasErrors = false;

  if(!video.user_id){
    hasErrors = true;
    errors.user_id = "Attribute user_id is missing";
  }
  if(!video.description && video.description !== ""){
    hasErrors = true;
    errors.description = "Attribute description is missing"; 
  }
  if(!video.video_url){
    hasErrors = true;
    errors.videoUrl = "Be sure to include a URL for your video!";
  }
  else if(!ReactPlayer.canPlay(video.video_url)){
    hasErrors = true;
    errors.videoUrl = "Unfortunately, LearnWell can't find a playable video at this URL.";
  }
  if(!video.title){
    hasErrors = true;
    errors.title = "Be sure to include a title for your video!";
  }

  return {errors, hasErrors};
};

const createVideo = async video => {
  const validation = validateVideo(video);
  if(validation.hasErrors){
    return {
      success: false,
      errors: validation.errors
    };
  }

  const data = JSON.parse(localStorage.getItem("evp_data")) || require("../data/emptydata.json");

  const newVideo = {
    created_at: dayjs.utc(new Date()),
    video_url: video.video_url,
    user_id: video.user_id,
    description: video.description,
    title: video.title,
    num_comments: 0,
    id: generateId()
  };

  data.videos.push(newVideo);

  localStorage.setItem("evp_data", JSON.stringify(data));

  return {
    success: true,
    video: newVideo
  }
};

export default createVideo;