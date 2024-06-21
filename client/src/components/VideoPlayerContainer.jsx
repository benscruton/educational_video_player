import { useEffect, useState } from "react";
import screenfull from "screenfull";
import { VideoControls, VideoPlayer } from "../components";
import styles from "../static/css/VideoPlayer.module.css";

const VideoPlayerContainer = ({url}) => {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playerFunctions, setPlayerFunctions] = useState(null);
  const [playTime, setPlayTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);

  const toggleFullScreen = () => {
    screenfull.toggle(document.getElementById("video-player-container"));
  };

  const updateFullscreenStatus = () =>
    setIsFullScreen(screenfull.isFullscreen);

  useEffect(() => {
    screenfull.on("change", updateFullscreenStatus);

    return () => {
      screenfull.off("change", updateFullscreenStatus)
    };
  }, []);

  return (
    <div className = {styles.wrapper}>
      <div
        id = "video-player-container"
        className = {styles.container}
      >

        <VideoPlayer
          styles = {styles}
          url = {url}
          isPlaying = {isPlaying}
          setIsPlaying = {setIsPlaying}
          playbackRate = {playbackRate}
          volume = {volume}
          isVolumeMuted = {isVolumeMuted}
          setPlayerFunctions = {setPlayerFunctions}
          setIsReady = {setIsReady}
        />
        
        <div className={styles.overlay}>
          {isReady ?
            <VideoControls
              styles = {styles}
              isPlaying = {isPlaying}
              setIsPlaying = {setIsPlaying}
              playbackRate = {playbackRate}
              setPlaybackRate = {setPlaybackRate}
              volume = {volume}
              setVolume = {setVolume}
              isVolumeMuted = {isVolumeMuted}
              setIsVolumeMuted = {setIsVolumeMuted}
              isFullScreen = {isFullScreen}
              toggleFullScreen = {toggleFullScreen}
              playerFunctions = {playerFunctions}
            />
            :
            <p className = "has-text-centered">
              Loading...
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerContainer;