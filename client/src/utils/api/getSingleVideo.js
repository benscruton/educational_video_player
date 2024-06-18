// GET to /videos/single?video_id=

const getSingleVideo = async videoId => {
  const {videos} = JSON.parse(localStorage.getItem("evp_data"));

  return videos.find(v => v.id === videoId);
};

export default getSingleVideo;