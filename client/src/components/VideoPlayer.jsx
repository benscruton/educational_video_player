import styles from "../static/css/VideoPlayer.module.css";
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

  getDuration = () => this.player.getDuration();

  render(){
    const {
      url,
      isPlaying,
      setIsPlaying,
      playbackRate,
      volume,
      isVolumeMuted,
      setPlayerFunctions,
      setIsReady
    } = this.props;

    const handleReady = () => {
      setPlayerFunctions({
        seekToTime: this.seekToTime,
        getTime: this.getTime,
        getDuration: this.getDuration
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
          playbackRate = {playbackRate}
          volume = {isVolumeMuted ? 0 : volume / 100}
          light = {false}
          onPlay = {() => setIsPlaying(true)}
          onPause = {() => setIsPlaying(false)}
          pip = {false}
          onReady = {handleReady}
          onEnded = {() => setIsPlaying(false)}
        />
      </>
    );
  }
}

export default VideoPlayer;