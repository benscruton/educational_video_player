const axios = require("axios");
const serverUrl = process.env.SERVER_URL;
const dayjs = require("dayjs");

// GET to /videos/comments?video_id=

const getVideoComments = (req, rsp) => {
  axios.get(
    `${serverUrl}/videos/comments?video_id=${req.params.videoId}`
  )
    .then(result => {
      const comments = result.data?.comments;
      const commentsCamelCase = comments
        .sort((a, b) =>
          dayjs(a.created_at) - dayjs(b.created_at)
        )
        .map(comment => ({
          createdAt: comment.created_at,
          content: comment.content,
          userId: comment.user_id,
          videoId: comment.video_id,
          id: comment.id
        }));
      rsp.json(commentsCamelCase);
    })
    .catch(e => {
      console.log(e);
      return [];
    });
};

module.exports = getVideoComments;