import { useEffect, useState } from "react";
import { formatSeconds } from "../utils";

const VideoControls = ({
  styles,
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

  const adjustVolume = info => {
    if(info?.target?.value){
      setVolume(info.target.value);
    }
    else if(info === "quieter" && volume > 0){
      setVolume(volume - 5);
    }
    else if(info === "louder" && volume < 100){
      setVolume(volume + 5);
    }
    else if(info === "mute"){
      setIsVolumeMuted(!isVolumeMuted);
    }
  };
  
  const adjustSpeed = info => {
    if(info?.target?.value){
      setPlaybackRate(info.target.value / 4);
    }
    else if(info === "slower" && playbackRate > 0.25){
      setPlaybackRate(playbackRate - 0.25);
    }
    else if(info === "faster" && playbackRate < 2){
      setPlaybackRate(playbackRate + 0.25);
    }
    else if(info === "reset"){
      setPlaybackRate(1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const seekVideo = mark => {
    playerFunctions.seekToTime(mark, "seconds");
    setCurrentTimeMark(mark);
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

  const seekProgressBar = e => {
    const mark = Math.floor((e.target.value * videoDuration * 10) / 10);
    setCurrentTimeMark(mark);
    seekVideo(mark);
  };
  
  return (
    <>
      <div className = {styles.topRow}>
        {/* Skip Back */}
        <i
          onClick = {() => seekBack(10)}
          className = {`bi-rewind ${styles.controlIconLarge}`}
        />
        
        {/* Play / Pause */}
        <i
          className = {`${isPlaying ? "bi-pause-fill" : "bi-play-fill"} ${styles.controlIconLarge} ${styles.playPause}`}
          onClick = {togglePlayPause}
        />

        {/* Skip Forward */}
        <i
          onClick = {() => seekForward(10)}
          className = {`bi-fast-forward ${styles.controlIconLarge}`}
        />
      </div>

      <div className = {styles.secondRow}>
          {/* Volume controls */}
        <div className = {styles.playbackContainer}>
          <div>
            <i
              className = {`${isVolumeMuted ? "bi-volume-mute-fill" : "bi-volume-down-fill"} ${styles.controlIconSmall}`}
              onClick = {() => adjustVolume("mute")}
            />
            Volume: {isVolumeMuted ? "mute" : `${volume}%`}
          </div>
          <div>
            <i
              className = {`bi-volume-down-fill ${styles.controlIconSmall}`}
              onClick = {() => adjustVolume("quieter")}
            />
            <input 
              type = "range"
              min = "0"
              max = "100"
              step = "5"
              value = {volume}
              onChange = {adjustVolume}
            />
            <i
              className = {`bi-volume-up-fill ${styles.controlIconSmall}`}
              onClick = {() => adjustVolume("louder")}
            />
          </div>
        </div>

        {/* Playback Speed Controls */}
        <div className = {styles.playbackContainer}>
          <div>
            <i
              className = {`bi-speedometer2 ${styles.controlIconSmall}`}
              onClick = {() => adjustSpeed("reset")}
            />
            Speed: {playbackRate}x
          </div>
          <div>
            <i
              className = {`bi-dash-circle ${styles.controlIconSmall}`}
              onClick = {() => adjustSpeed("slower")}
            />
              <input
                type = "range"
                min = "1"
                max = "8"
                step = "1"
                value = {playbackRate * 4}
                onChange = {adjustSpeed}
              />
            <i
              className = {`bi-plus-circle ${styles.controlIconSmall}`}
              onClick = {() => adjustSpeed("faster")}
            />
          </div>
        </div>
        
      </div>

      <div className = {styles.thirdRow}>
        {/* Playback indicator bar */}
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
            value = {currentTimeMark / videoDuration}
            onChange = {seekProgressBar}
          />
          <span>
            {formatSeconds(videoDuration)}
          </span>
        </div>

        {/* Fullscreen button */}
        <div>
          <i
            className = {`${isFullScreen ? "bi-fullscreen-exit" : "bi-arrows-fullscreen"} ${styles.controlIconMedium}`}
            onClick = {toggleFullScreen}
          />
        </div>
      </div>
    </>
  );
};

export default VideoControls;