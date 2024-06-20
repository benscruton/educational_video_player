import axios from "axios";

const noEmbedUrl = "https://noembed.com/embed?url=";

const getThumbnailUrl = async videoUrl => {
  return axios.get(`${noEmbedUrl}${videoUrl}`)
    .then(rsp => {
      const thumbnailUrl = rsp.data?.thumbnail_url;
      return {
        success: !!rsp.data?.thumbnail_url,
        thumbnailUrl: thumbnailUrl
      };
    })
    .catch(e => ({
      success: false,
      error: e
    }));
};

export default getThumbnailUrl;