import styles from "../static/css/VideoPlayer.module.css";

const PlayPauseSkip = ({
  isPlaying,
  setIsPlaying,
  seekVideo,
  currentTimeMark,
  videoDuration
}) => {
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const seekBack = interval => {
    const newTime = Math.max(
      currentTimeMark - interval,
      0
    );
    seekVideo(newTime);
  };

  const seekForward = interval => {
    const newTime = Math.min(
      currentTimeMark + interval,
      videoDuration 
    );
    seekVideo(newTime);
  };

  return (
    <div className = {styles.playPauseSkip}>
      {/* Skip Back */}
      <i
        onClick = {() => seekBack(10)}
        className = "bi-rewind"
        title = "Skip back"
      />
      
      {/* Play / Pause */}
      <i
        className = {isPlaying ? "bi-pause-fill" : "bi-play-fill"}
        onClick = {togglePlayPause}
        title = {isPlaying ? "Pause video" : "Play video"}
      />

      {/* Skip Forward */}
      <i
        onClick = {() => seekForward(10)}
        className = "bi-fast-forward"
        title = "Skip forward"
      />
    </div>
  );
};

export default PlayPauseSkip;