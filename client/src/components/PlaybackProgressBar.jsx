import styles from "../static/css/VideoPlayer.module.css";
import { formatSeconds } from "../utils";

const PlaybackProgressBar = ({
  currentTimeMark,
  setCurrentTimeMark,
  videoDuration,
  seekVideo
}) => {
  const seekToTime = e => {
    const mark = Math.floor((e.target.value * videoDuration * 10) / 10);
    setCurrentTimeMark(mark);
    seekVideo(mark);
  };

  return (
    <div className = {styles.playProgressBarContainer}>
      <span>
        {formatSeconds(Math.floor(currentTimeMark))}
      </span>

      <input
        className = {styles.playProgressBar}
        type = "range"
        min = "0"
        max = "1"
        step = "any"
        value = {(currentTimeMark / videoDuration) || 0}
        onChange = {seekToTime}
      />
      <span>
        {formatSeconds(videoDuration)}
      </span>
    </div>
  );
};

export default PlaybackProgressBar;