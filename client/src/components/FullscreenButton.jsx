import styles from "../static/css/VideoPlayer.module.css";

const FullscreenButton = ({
  isFullScreen,
  toggleFullScreen
}) => {
  return (
    <div>
      <i
        className = {`${isFullScreen ? "bi-fullscreen-exit" : "bi-arrows-fullscreen"} ${styles.fullscreenButton}`}
        title = {isFullScreen ? "Exit full screen" : "Enter full screen"}
        onClick = {toggleFullScreen}
      />
    </div>
  );
};

export default FullscreenButton;