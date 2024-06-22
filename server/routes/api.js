const router = require("express").Router();
const path = require("path");
const controller = require("../controllers");

router.route("/videos")
  .post(controller.createVideo);

router.route("/users/:userId")
  .get(controller.getUserVideos);

router.route("/videos/:videoId")
  .get(controller.getSingleVideo)
  .put(controller.editVideo);

router.route("/comments/:videoId")
  .get(controller.getVideoComments)
  .post(controller.createComment);

module.exports = router;