import {
  VideoComments,
  VideoPlayer
} from "../components";

const VideoPage = () => {
  return (
    <div style={{border: "2px solid purple"}}>
      <h2>Video Page</h2>
      <VideoPlayer />

      <VideoComments />
    </div>
  );
};

export default VideoPage;