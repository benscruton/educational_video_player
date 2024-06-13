import {useState} from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({url}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playStartCount, setPlayStartCount] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);


  if(!url)
    url = "https://www.youtube.com/watch?v=OTFUqZi69Gs";          // youtube
    // url = "https://samplelib.com/lib/preview/mp4/sample-20s.mp4"; // mp4

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
      <ReactPlayer
        url = {url}
        controls = {true}
        playing = {isPlaying}
        light = {true}
        playIcon = {<button onClick={() => setIsPlaying(!isPlaying)}>Play</button>}
        onPlay = {() => {
          setPlayStartCount(playStartCount + 1);
          setIsPlaying(true);
        }}
        onPause = {() => {
          setIsPlaying(false);
        }}
        playbackRate = {playbackRate}
        pip = {false}
      />

      <p>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause" : "Play"} video
        </button>
      </p>

      <p>Playback speed ({playbackRate})</p>
      <p>
        <button
          onClick = {() => adjustSpeed("slower")}
          disabled = {playbackRate <= 0.25}
        >
          -
        </button>
        {"-".repeat((playbackRate * 8) - 2) + "()" + "-".repeat(16 - (playbackRate * 8))}
        <button
          onClick = {() => adjustSpeed("faster")}
          disabled = {playbackRate >= 2}
        >
          +
        </button>
      </p>
        
        



      You have started this video {playStartCount} times.
    </>
  );
};

export default VideoPlayer;