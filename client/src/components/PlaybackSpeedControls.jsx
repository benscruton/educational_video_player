import styles from "../static/css/VideoPlayer.module.css";

const PlaybackSpeedControls = ({
  playbackRate,
  setPlaybackRate
}) => {
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

  return (
    <div className = {styles.speedContainer}>
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
  );
};

export default PlaybackSpeedControls;