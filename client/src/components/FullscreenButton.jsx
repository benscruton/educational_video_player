import styles from "../static/css/VideoPlayer.module.css";

const FullscreenButton = ({
  isFullScreen,
  toggleFullScreen 
}) => {
  return (
    <div>
      <i
        className = {`${isFullScreen ? "bi-fullscreen-exit" : "bi-arrows-fullscreen"} ${styles.fullscreenButton}`}
        onClick = {toggleFullScreen}
      />
    </div>
  );
};

export default FullscreenButton;