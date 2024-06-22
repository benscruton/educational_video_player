import axios from "axios";

// GET to /videos/single?video_id=

const getSingleVideo = async (videoId, serverUrl) => {
  return axios.get(
    `${serverUrl}/api/videos/${videoId}`
  )
    .then(rsp => rsp.data)
    .catch(e => {
      console.log(e);
    });
};

export default getSingleVideo;