import { useEffect, useState } from "react";
import screenfull from "screenfull";
import {
  FullscreenInstructionsModal,
  VideoControls,
  VideoPlayer
} from "../components";
import styles from "../static/css/VideoPlayer.module.css";

const VideoPlayerContainer = ({url}) => {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playerFunctions, setPlayerFunctions] = useState(null);
  const [volume, setVolume] = useState(70);
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);
  const [isInstructionModalShown, setIsInstructionModalShown] = useState(false);
  const [hasSeenInstructions, setHasSeenInstructions] = useState(
    !!localStorage.getItem("evp_has_seen_instructions")
  )

  const toggleFullScreen = () => {
    if(!hasSeenInstructions){
      return setIsInstructionModalShown(true);
    }
    screenfull.toggle(document.getElementById(
      "video-player-container"
    ));
  };

  const proceedToFullscreen = () => {
    setIsInstructionModalShown(false);
    setHasSeenInstructions(true);
    localStorage.setItem(
      "evp_has_seen_instructions",
      "1"
    );
    screenfull.request(document.getElementById(
      "video-player-container"
    ));
  };

  const updateFullscreenStatus = () =>
    setIsFullScreen(screenfull.isFullscreen);

  useEffect(() => {
    screenfull.on("change", updateFullscreenStatus);
    return () => {
      screenfull.off("change", updateFullscreenStatus)
    };
  }, []);

  const videoControls = (isReady ?
    <VideoControls
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
  );

  return (
    <div className = {styles.playerControlWrapper}>
      {isInstructionModalShown ?
        <FullscreenInstructionsModal
          proceedToFullscreen = {proceedToFullscreen}
        />
        :
        <></>
      }

      <div className = {styles.wrapper}>
        <div
          id = "video-player-container"
          className = {styles.container}
        >

          <VideoPlayer
            url = {url}
            isPlaying = {isPlaying}
            setIsPlaying = {setIsPlaying}
            playbackRate = {playbackRate}
            volume = {volume}
            isVolumeMuted = {isVolumeMuted}
            setPlayerFunctions = {setPlayerFunctions}
            setIsReady = {setIsReady}
          />
          
          {isFullScreen ?
            <div className={styles.controlsOverlay}>
              {videoControls}
            </div>
            :
            <></>
          }
        </div>
      </div>

      {isFullScreen ?
        <></>
        :
        <div className = {styles.controlsBeneath}>
          {videoControls}
        </div>
      }
    </div>
  );
};

export default VideoPlayerContainer;