import axios from "axios";

// PUT to /videos

const validateVideo = video => {
  const errors = {};
  let hasErrors = false;

  if(!video.title){
    hasErrors = true;
    errors.title = "Video's title cannot be empty."
  }

  return {errors, hasErrors};
};

const editVideo = async (video, serverUrl) => {
  const validation = validateVideo(video);
  if(validation.hasErrors){
    return {
      success: false,
      errors: validation.errors
    };
  }

  return axios.put(
    `${serverUrl}/api/videos/${video.id}`,
    {
      title: video.title,
      description: video.description
    }
  )
    .then(rsp => rsp.data)
    .catch(e => console.log(e));
};

export default editVideo;