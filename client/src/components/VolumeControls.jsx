import styles from "../static/css/VideoPlayer.module.css";

const VolumeControls = ({
  isVolumeMuted,
  setIsVolumeMuted,
  volume,
  setVolume
}) => {
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

  return (
    <div className = {styles.volumeContainer}>
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
  );
};

export default VolumeControls;