// PUT to /videos

const sampleDataFormat = {
  video_id: "string",
  title: "string",
  description: "string"
};

const validateVideo = video => {
  const errors = {};
  let hasErrors = false;

  if(!video.title){
    hasErrors = true;
    errors.title = "Video's title cannot be empty."
  }

  return {errors, hasErrors};
};

const editVideo = async video => {
  const data = JSON.parse(localStorage.getItem("evp_data")) || require("../data/emptydata.json");

  const validation = validateVideo(video);
  if(validation.hasErrors){
    return {
      success: false,
      errors: validation.errors
    };
  }

  const updatedVideo = data.videos.find(v => v.id === video.id);
  updatedVideo.title = video.title;
  updatedVideo.description = video.description;

  localStorage.setItem("evp_data", JSON.stringify(data));

  const camelCaseVideo = {
    createdAt: updatedVideo.created_at,
    videoUrl: updatedVideo.video_url,
    userId: updatedVideo.user_id,
    description: updatedVideo.description,
    title: video.title,
    numComments: updatedVideo.num_comments,
    id: updatedVideo.id
  }

  return {
    success: true,
    video: camelCaseVideo
  };
};

export default editVideo;