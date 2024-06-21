import styles from "../static/css/VideoPlayer.module.css";
import { useEffect, useState } from "react";
import {
  FullscreenButton,
  PlaybackProgressBar,
  PlaybackSpeedControls,
  PlayPauseSkip,
  VolumeControls
} from "../components";

const VideoControls = ({
  isPlaying,
  setIsPlaying,
  playbackRate,
  setPlaybackRate,
  playerFunctions,
  volume,
  setVolume,
  isVolumeMuted,
  setIsVolumeMuted,
  isFullScreen,
  toggleFullScreen
}) => {
  const [currentTimeMark, setCurrentTimeMark] = useState(playerFunctions.getTime());
  const [videoDuration, setVideoDuration] = useState(null);

  useEffect(() => {
    if(isPlaying){
      const refreshTime = setInterval(() => {
        setCurrentTimeMark(playerFunctions.getTime());
      }, Math.floor(1000 / playbackRate));

      return () => {
        clearInterval(refreshTime);
      }
    }
  }, [isPlaying, playbackRate, playerFunctions]); 

  /* 
    Update video duration if it changes -- some
    players (e.g. Twitch) seem to return 0 until
    playing has started, which led to seek failures
  */
  useEffect(() => {
    setVideoDuration(playerFunctions.getDuration());
  }, [playerFunctions.getDuration()]); // eslint-disable-line react-hooks/exhaustive-deps

  const seekVideo = mark => {
    playerFunctions.seekToTime(mark, "seconds");
    setCurrentTimeMark(mark);
  };
  
  return (
    <>
      <div className = {styles.topRow}>
        <PlayPauseSkip
          isPlaying = {isPlaying}
          setIsPlaying = {setIsPlaying}
          seekVideo = {seekVideo}
          currentTimeMark = {currentTimeMark}
          videoDuration = {videoDuration}
        />
      </div>

      <div className = {styles.secondRow}>
        <VolumeControls
          volume = {volume}
          setVolume = {setVolume}
          isVolumeMuted = {isVolumeMuted}
          setIsVolumeMuted = {setIsVolumeMuted}
        />

        <PlaybackSpeedControls
          playbackRate = {playbackRate}
          setPlaybackRate = {setPlaybackRate}
        />
      </div>

      <div className = {styles.thirdRow}>
        <PlaybackProgressBar
          currentTimeMark = {currentTimeMark}
          setCurrentTimeMark = {setCurrentTimeMark}
          videoDuration = {videoDuration}
          seekVideo = {seekVideo}
        />

        <FullscreenButton
          isFullScreen = {isFullScreen}
          toggleFullScreen = {toggleFullScreen}
        />

      </div>
    </>
  );
};

export default VideoControls;