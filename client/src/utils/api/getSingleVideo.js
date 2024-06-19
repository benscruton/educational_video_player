// GET to /videos/single?video_id=

const getSingleVideo = async videoId => {
  const {videos} = JSON.parse(localStorage.getItem("evp_data"));

  const video = videos.find(v => v.id === videoId);

  return {
    createdAt: video.created_at,
    videoUrl: video.video_url,
    userId: video.user_id,
    description: video.description,
    title: video.title,
    numComments: video.num_comments,
    id: video.id
  };
};

export default getSingleVideo;