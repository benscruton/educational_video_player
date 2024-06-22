import axios from "axios";

// GET to /videos?user_id=

const getUserVideos = async (userId, serverUrl) => {
  return axios.get(
    `${serverUrl}/api/users/${userId}`
  )
    .then(rsp => rsp.data)
    .catch(e => console.log(e));
};

export default getUserVideos;