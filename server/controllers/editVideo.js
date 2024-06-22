const axios = require("axios");
const serverUrl = process.env.SERVER_URL;

// PUT to /videos

const editVideo = (req, rsp) => {
  const snake_case_video = {
    video_id: req.params.videoId,
    title: req.body.title,
    description: req.body.description
  };

  axios.put(
    `${serverUrl}/videos`,
    snake_case_video
  )
    .then(() => {
      rsp.json({
        success: true,
        video: {
          title: req.body.title,
          description: req.body.description
        }
      });
    })
    .catch(e => {
      console.log(e);
      rsp.json({
        success: false,
        error: e
      });
    });
};

module.exports = editVideo;