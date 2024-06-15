import { useState } from "react";
import ReactPlayer from "react-player";
import { VideoControls } from "../components";
import styles from "../static/css/VideoPlayer.module.css";

const VideoPlayer = ({url}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  return (
    <div className = {styles.container}>
      <ReactPlayer
        className = {styles.reactPlayer}
        width = "640px"
        height = "360px"
        url = {url}
        controls = {false}
        playing = {isPlaying}
        light = {false}
        playIcon = {<button onClick={() => setIsPlaying(!isPlaying)}>Play</button>}
        onPlay = {() => {
          setIsPlaying(true);
        }}
        onPause = {() => {
          setIsPlaying(false);
        }}
        playbackRate = {playbackRate}
        pip = {false}
      />

      <div className={styles.overlay}>
        <VideoControls 
          isPlaying = {isPlaying}
          setIsPlaying = {setIsPlaying}
          playbackRate = {playbackRate}
          setPlaybackRate = {setPlaybackRate}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;