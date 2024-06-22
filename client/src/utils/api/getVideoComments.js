import axios from "axios";

// GET to /videos/comments?video_id=

const getVideoComments = async (videoId, serverUrl) => {
  return axios.get(
    `${serverUrl}/api/comments/${videoId}`
  )
    .then(rsp => rsp.data)
    .catch(e => {
      console.log(e);
      return [];
    });
};

export default getVideoComments;