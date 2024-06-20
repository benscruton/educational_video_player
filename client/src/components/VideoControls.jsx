const VideoControls = ({
  styles,
  isPlaying,
  setIsPlaying,
  playbackRate,
  setPlaybackRate,
  playerFunctions
}) => {

  const adjustSpeed = direction => {
    if(direction === "slower" && playbackRate > 0.25){
      setPlaybackRate(playbackRate - 0.25);
    }
    else if(direction === "faster" && playbackRate < 2){
      setPlaybackRate(playbackRate + 0.25);
    }
  }

  const toggpePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const seekVideo = mark => {
    playerFunctions.seekToTime(mark);
  };

  const seekBack = interval => {
    const currentTime = playerFunctions.getTime();
    const newTime = Math.max(
      currentTime - interval,
      0
    );
    seekVideo(newTime);
  };

  const seekForward = interval => {
    const currentTime = playerFunctions.getTime();
    const newTime = currentTime + interval;
    seekVideo(newTime);
  };
  
  return (
    <>
      {/* <button className = "button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"} video
      </button>

      <p>Playback speed ({playbackRate})</p>
      <p>
        <button
          className = "button"
          onClick = {() => adjustSpeed("slower")}
          disabled = {playbackRate <= 0.25}
        >
          -
        </button>
        {"-".repeat((playbackRate * 8) - 2) + "()" + "-".repeat(16 - (playbackRate * 8))}
        <button
          className = "button"
          onClick = {() => adjustSpeed("faster")}
          disabled = {playbackRate >= 2}
        >
          +
        </button>
      </p> */}

      <div className = {styles.topRow}>
        {/* Skip Back */}
        <i
          onClick = {() => seekBack(10)}
          className = {`bi-rewind ${styles.controlIcon}`}
        />
        
        {/* Play / Pause */}
        <i
          className = {`${isPlaying ? "bi-pause-fill" : "bi-play-fill"} ${styles.controlIcon} ${styles.playPause}`}
          onClick = {toggpePlayPause}
        />

        {/* Skip Forward */}
        <i
          onClick = {() => seekForward(10)}
          className = {`bi-fast-forward ${styles.controlIcon}`}
        />
      </div>


    </>
  );
};

export default VideoControls;