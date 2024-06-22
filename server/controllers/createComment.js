const axios = require("axios");
const dayjs = require("dayjs");
const serverUrl = process.env.SERVER_URL;

const createComment = (req, rsp) => {
const snake_case_comment = {
    video_id: req.params.videoId,
    user_id: req.body.userId,
    content: req.body.content
  };

  axios.post(
    `${serverUrl}/videos/comments`,
    snake_case_comment
  )
    .then(() => {
      /*
        Like the Create Video endpoint, we don't
        get the object back as a response. We'll
        fetch it here so we can use the ID.
      */
      axios.get(
        `${serverUrl}/videos/comments?video_id=${req.params.videoId}`
      )
        .then(result => {
          const comments = result.data?.comments;
          comments.sort((a, b) =>
            dayjs(a.created_at) - dayjs(b.created_at)
          );
          console.log(comments);
          const latestComment = comments[comments.length - 1];
          rsp.json({
            success: true,
            comment: {
              createdAt: latestComment.created_at,
              content: latestComment.content,
              userId: latestComment.user_id,
              videoId: latestComment.videoId,
              id: latestComment.id
            }
          });
        })
        .catch(e => {
          console.log(e);
          return {
            success: true,
            id: "?"
          };
        });
    })
    .catch(e => {
      console.log(e);
      return {
        succes: false,
        errors: {content: e}
      }; 
    });
};

module.exports = createComment;