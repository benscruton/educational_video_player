const axios = require("axios");
const serverUrl = process.env.SERVER_URL;

// GET to /videos/single?video_id=

const getSingleVideo = (req, rsp) => {
  axios.get(
    `${serverUrl}/videos/single?video_id=${req.params.videoId}`
  )
    .then(result => {
      const snake_case_video = result.data.video;
      const camelCaseVideo = {
        createdAt: snake_case_video.created_at,
        videoUrl: snake_case_video.video_url,
        userId: snake_case_video.user_id,
        description: snake_case_video.description,
        title: snake_case_video.title,
        numComments: snake_case_video.num_comments,
        id: snake_case_video.id
      };
      rsp.json(camelCaseVideo);
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports = getSingleVideo;