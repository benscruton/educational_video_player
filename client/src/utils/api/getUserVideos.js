// GET to /videos?user_id=

const getUserVideos = async userId => {
  const {videos} = JSON.parse(localStorage.getItem("evp_data"));
  
  return {
    data: videos.filter(v =>
      v.user_id === userId
    )
  };
};

export default getUserVideos;