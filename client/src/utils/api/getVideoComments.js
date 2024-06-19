// GET to /videos/comments?video_id=

const getVideoComments = async videoId => {
  const data = JSON.parse(localStorage.getItem("evp_data")) || require("../data/emptydata.json");

  const videoComments = data.comments
    .filter(c =>
      c.video_id === videoId
    )
    .map(c => ({
      content: c.content,
      createdAt: c.created_at,
      id: c.id,
      userId: c.user_id,
      videoId: c.video_id
    }));

  return videoComments;
};

export default getVideoComments;