const axios = require("axios");
const serverUrl = process.env.SERVER_URL;

const createVideo = (req, rsp) => {
  const snake_case_video = {
    user_id: req.body.userId,
    description: req.body.description,
    video_url: req.body.videoUrl,
    title: req.body.title
  };

  // Create the video
  axios.post(
    `${serverUrl}/videos`,
    snake_case_video
  )
    .then(async () => {
      /*
        We don't get the ID back with a successful response,
        so we'll go find it using the Get User Videos endpoint.
      */
      axios.get(`${serverUrl}/videos?user_id=${req.body.userId}`)
        .then(result => {
          const videos = result.data?.videos;
          const latestVideo = videos[0];
          rsp.json({
            success: true,
            destination: `/videos/${req.body.userId}/${latestVideo.id}`
          });
        })
        .catch(e => {
          console.log(e);
          return {
            success: true,
            destination: `/users/${video.userId}`
          }
        });
    })
    .catch(e => {
      return {
        success: false,
        errors: {title: e}
      };
    });
};

module.exports = createVideo;