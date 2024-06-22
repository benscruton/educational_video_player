const axios = require("axios");
const serverUrl = process.env.SERVER_URL;

// GET to /videos?user_id=

const getUserVideos = (req, rsp) => {
  axios.get(
    `${serverUrl}/videos?user_id=${req.params.userId}`
  )
    .then(result => {
      const videos = result.data?.videos;
      const camelCaseVideos = videos
        .map(video => ({
          createdAt: video.created_at,
          videoUrl: video.video_url,
          userId: video.user_id,
          description: video.description,
          title: video.title,
          numComments: video.num_comments,
          id: video.id
        }));
      rsp.json(camelCaseVideos);
    })
    .catch(e => console.log(e));
};

module.exports = getUserVideos;