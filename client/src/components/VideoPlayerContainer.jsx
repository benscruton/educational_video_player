import { useEffect, useRef, useState } from "react";
import screenfull from "screenfull";
import { VideoControls, VideoPlayer } from "../components";
import styles from "../static/css/VideoPlayer.module.css";

const VideoPlayerContainer = ({url}) => {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playerFunctions, setPlayerFunctions] = useState(null);
  const [playTime, setPlayTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const toggleFullScreen = () => {
    screenfull.toggle(document.getElementById("video-player-container"));
  };

  return (
    <div className = {styles.wrapper}>
      <div
        id = "video-player-container"
        className = {styles.container}
        onMouseOver = {() => setIsHovering(true)}
        onMouseOut = {() => setIsHovering(false)}
      >

        <VideoPlayer
          styles = {styles}
          url = {url}
          isPlaying = {isPlaying}
          setIsPlaying = {setIsPlaying}
          playbackRate = {playbackRate}
          setPlayerFunctions = {setPlayerFunctions}
          setIsReady = {setIsReady}
        />

        <button onClick = {toggleFullScreen} className = "button">Full screen</button>

        {isHovering ?
          <div className={styles.overlay}>
            {isReady ?
              <VideoControls
                styles = {styles}
                isPlaying = {isPlaying}
                setIsPlaying = {setIsPlaying}
                playbackRate = {playbackRate}
                setPlaybackRate = {setPlaybackRate}
                playerFunctions = {playerFunctions}
              />
              :
              <p className = "has-text-centered">
                Loading...
              </p>
            }
          </div>
          :
          <></>
        }
      </div>

      <button
        className = "button"
        onClick = {() => {
          setPlayTime(playerFunctions.getTime());
        }}
      >test</button>
      <p>{playTime}</p>
    </div>
  );
};

export default VideoPlayerContainer;