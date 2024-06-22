import axios from "axios";
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

  if(!video.userId){
    hasErrors = true;
    errors.userId = "Attribute user_id is missing";
  }
  if(!video.description && video.description !== ""){
    hasErrors = true;
    errors.description = "Attribute description is missing"; 
  }
  if(!video.videoUrl){
    hasErrors = true;
    errors.videoUrl = "Be sure to include a URL for your video!";
  }
  else if(!ReactPlayer.canPlay(video.videoUrl)){
    hasErrors = true;
    errors.videoUrl = "Unfortunately Learnwell can't find a playable video at this URL.";
  }
  if(!video.title){
    hasErrors = true;
    errors.title = "Be sure to include a title for your video!";
  }

  return {errors, hasErrors};
};

const createVideo = async (video, serverUrl) => {
  const validation = validateVideo(video);
  if(validation.hasErrors){
    return {
      success: false,
      errors: validation.errors
    };
  }

  // Create the video
  return axios.post(
    `${serverUrl}/api/videos`,
    video
  )
    .then(rsp => rsp.data)
    .catch(e => {
      return {
        success: false,
        errors: {title: e.message}
      };
    });
};

export default createVideo;