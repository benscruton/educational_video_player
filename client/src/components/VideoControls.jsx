const VideoControls = ({
  isPlaying,
  setIsPlaying,
  playbackRate,
  setPlaybackRate,
}) => {

  const adjustSpeed = direction => {
    if(direction === "slower" && playbackRate > 0.25){
      setPlaybackRate(playbackRate - 0.25);
    }
    else if(direction === "faster" && playbackRate < 2){
      setPlaybackRate(playbackRate + 0.25);
    }
  }
  
  return (
    <>
      <button className = "button" onClick={() => setIsPlaying(!isPlaying)}>
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
      </p>
    </>
  );
};

export default VideoControls;