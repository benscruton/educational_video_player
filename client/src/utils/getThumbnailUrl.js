import axios from "axios";

const noEmbedUrl = "https://noembed.com/embed?url=";

const getThumbnailUrl = async videoUrl => {
  console.log("Getting thumbnail");
  return axios.get(`${noEmbedUrl}${videoUrl}`)
    .then(rsp => ({
      success: !!rsp.data?.thumbnail_url,
      thumbnailUrl: rsp.data?.thumbnail_url
    }))
    .catch(e => ({
      success: false,
      error: e
    }));
};

export default getThumbnailUrl;