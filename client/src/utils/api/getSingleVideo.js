// GET to /videos/single?video_id=

const getSingleVideo = async videoId => {
  const {videos} = JSON.parse(localStorage.getItem("evp_data"));

  return {
    data: videos.find(v => v.id === videoId)
  };
};

export default getSingleVideo;