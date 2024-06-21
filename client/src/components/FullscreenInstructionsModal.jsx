import styles from "../static/css/VideoPlayer.module.css";

const FullscreenInstructionsModal = ({proceedToFullscreen}) => {
  return (
    <div className = {`modal is-active ${styles.instructionModal}`}>
      <div className = "modal-background"/>

      <div className = "modal-content">
        <div className = "message is-info">
          <header className = "message-header">
            <p className = "is-centered">
              You are about to enter full screen!
            </p>
          </header>

          <div className = "message-body">
            <p>
              In full screen mode, hover or touch the bottom portion of the screen to show video controls. Hover or touch anywhere else to hide the controls.
            </p>
            <div className = "has-text-centered">
              <button
                className = "button is-info mt-3"
                onClick = {proceedToFullscreen}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenInstructionsModal;