// GET to /videos?user_id=

const getUserVideos = async userId => {
  const {videos} = JSON.parse(localStorage.getItem("evp_data"));
  
  return videos
    .filter(v =>
      v.user_id === userId
    ).map(video => ({
      createdAt: video.created_at,
      videoUrl: video.video_url,
      userId: video.user_id,
      description: video.description,
      title: video.title,
      numComments: video.num_comments,
      id: video.id
    }));
};

export default getUserVideos;