import React, { Component } from "react";
import ReactPlayer from "react-player";

class VideoPlayer extends Component {
  ref = player => {
    this.player = player;
  }

  seekToTime = mark => {
    this.player.seekTo(mark, "seconds");
  }

  getTime = () => this.player.getCurrentTime();

  render(){
    const {
      styles,
      url,
      isPlaying,
      setIsPlaying,
      playbackRate,
      setPlayerFunctions,
      setIsReady
    } = this.props;

    const handleReady = () => {
      setPlayerFunctions({
        seekToTime: this.seekToTime,
        getTime: this.getTime
      });
      setIsReady(true);
    };

    return (
      <>
      <ReactPlayer
        ref = {this.ref}
        className = {styles.reactPlayer}
        url = {url}
        height = "100%"
        width = "100%"
        controls = {false}
        playing = {isPlaying}
        light = {false}
        onPlay = {() => setIsPlaying(true)}
        onPause = {() => setIsPlaying(false)}
        pip = {false}
        onReady = {handleReady}
      />
      <p
        style = {{position: "absolute", top: "-30px"}}
        onClick = {() => this.goTo10Seconds()}
      > hello there </p>
      </>
    );
  }
}

export default VideoPlayer;