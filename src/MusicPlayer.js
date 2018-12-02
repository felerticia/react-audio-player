import React, { Component } from "react";
import "./style.scss";

//props :
//   data : [
//        duration : '00:02:00',
//        title : 'whatever',
//        audioSource : 'url to song'
//   ]

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: this.props.data.map(item => {
        const durationArray = item.duration.split(":");
        const seconds = durationArray.reduce(
          (acc, val, index) => acc + Number(val) * Math.pow(60, 2 - index),
          0
        );

        const duration =
          durationArray[0] === "00"
            ? durationArray[1] + ":" + durationArray[2]
            : item.duration;

        return { ...item, duration, seconds };
      }),
      is_playing: false,
      progress: 0,
      currentSong: 0,
      volume: 1
    };
  }

  goPrevSong() {
    this.setState({
      currentSong:
        this.state.currentSong === 0
          ? this.state.playlist.length - 1
          : this.state.currentSong - 1,
      is_playing: true
    });
  }

  gonextSong() {
    this.setState({
      currentSong:
        this.state.currentSong === this.state.playlist.length - 1
          ? 0
          : this.state.currentSong + 1,
      is_playing: true
    });
  }

  goToSong(x) {
    this.setState({
      currentSong: x,
      is_playing: true
    });
  }

  playPause() {
    if (this.state.is_playing) this.audioElement.pause();
    else this.audioElement.play();
    this.setState({
      is_playing: !this.state.is_playing
    });
  }

  setVolume(e) {
    const w = Math.floor(e.target.getBoundingClientRect().width);
    const p = Math.ceil(e.pageX - e.target.getBoundingClientRect().x);
    this.audioElement.volume = p / w;
    this.setState({
      volume: p / w
    });
    this.volumeSlider.style.width = Math.ceil((100 * p) / w) + "%";
  }

  mute() {
    if (this.state.volume > 0) {
      this.setState({
        prevVol: this.state.volume,
        volume: 0
      });
      this.audioElement.volume = 0;
      this.volumeSlider.style.width = "0%";
    } else {
      this.setState({
        volume: this.state.prevVol || 1
      });
      this.audioElement.volume = this.state.prevVol;
      this.volumeSlider.style.width = this.state.prevVol * 100 + "%";
    }
  }

  timeUpdate(forced) {
    if (
      this.state.progress !== Math.floor(this.audioElement.currentTime) ||
      forced
    ) {
      this.setState({
        progress: Math.floor(this.audioElement.currentTime)
      });
      this.formatTime();
      this.timeProgress();
    }
  }

  timeProgress() {
    this.progressSlider.style.width =
      Math.ceil(
        (100 * this.state.progress) /
          this.state.playlist[this.state.currentSong].seconds
      ) + "%";
  }

  formatTime() {
    const h =
      Math.floor(this.state.progress / 3600) === 0
        ? ""
        : Math.floor(this.state.progress / 3600) > 9
        ? "" + Math.floor(this.state.progress / 3600) + ":"
        : "0" + Math.floor(this.state.progress / 3600) + ":";
    const m =
      Math.floor((this.state.progress % 3600) / 60) > 9
        ? "" + Math.floor((this.state.progress % 3600) / 60) + ":"
        : "0" + Math.floor((this.state.progress % 3600) / 60) + ":";
    const s =
      Math.floor(this.state.progress % 60) > 9
        ? "" + Math.floor(this.state.progress % 60)
        : "0" + Math.floor(this.state.progress % 60);
    this.setState({
      formattedTime: h + m + s
    });
  }

  seekTo(e) {
    const w = Math.floor(e.target.getBoundingClientRect().width);
    const p = Math.ceil(e.pageX - e.target.getBoundingClientRect().x);
    this.audioElement.currentTime = Math.floor(
      (p * this.state.playlist[this.state.currentSong].seconds) / w
    );
    this.timeUpdate(true);
    this.timeProgress();
  }

  render() {
    return (
      <div className="box box--title">
        <audio
          ref={x => {
            this.audioElement = x;
          }}
          onTimeUpdate={this.timeUpdate.bind(this)}
          src={this.state.playlist[this.state.currentSong].audioSource}
          autoPlay={this.state.is_playing}
        />
        <div className="music-player">
          <div className="player-container">
            <div
              className="progress-container"
              onClick={this.seekTo.bind(this)}
            >
              <div
                className="progress"
                ref={elm => {
                  this.progressSlider = elm;
                }}
              />
            </div>
            <div className="control-container">
              <div className="time">{this.state.formattedTime}</div>
              <div onClick={this.goPrevSong.bind(this)} className="prev" />
              <div
                onClick={this.playPause.bind(this)}
                className={this.state.is_playing ? "playing" : "paused"}
              />
              <div onClick={this.gonextSong.bind(this)} className="next" />
              <div onClick={this.mute.bind(this)} className="volume" />
              <div
                className="volume-container"
                onClick={this.setVolume.bind(this)}
              >
                <div
                  className="progress"
                  ref={elm => {
                    this.volumeSlider = elm;
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="music-list">
          {this.state.playlist.map((item, key) => (
            <div
              className={`music-list__item ${
                key === this.state.currentSong ? "music-list__item--active" : ""
              }`}
              onClick={this.goToSong.bind(this, key)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
