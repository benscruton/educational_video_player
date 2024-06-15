import {generateId} from ".";

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
    errors.description = "Attribute video_url is missing";
  }
  if(!video.title){
    hasErrors = true;
    errors.title = "Attribute title is missing";
  }

  return {errors, hasErrors};
};

const createVideo = video => {
  const validation = validateVideo(video);
  if(validation.hasErrors){
    return {
      success: false,
      validation
    };
  }

  const data = JSON.parse(localStorage.getItem("evp_data")) || require("../data/emptydata.json");

  data.videos.push({
    created_at: new Date(),
    video_url: video.video_url,
    user_id: video.user_id,
    description: video.description,
    title: video.title,
    num_comments: 0,
    id: generateId()
  });

  localStorage.setItem("evp_data", JSON.stringify(data));
  return {success: true}
};

export default createVideo;