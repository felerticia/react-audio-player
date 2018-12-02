import React, { Component } from "react";
import MusicPlayer from "./MusicPlayer";

class App extends Component {
  state = {
    data: [
      {
        duration: "00:00:28",
        title: "crowd",
        audioSource:
          "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3"
      },
      {
        duration: "00:00:45",
        title: "wave",
        audioSource: "https://www.sample-videos.com/audio/mp3/wave.mp3"
      }
    ]
  };
  render() {
    return <MusicPlayer data={this.state.data} />;
  }
}

export default App;
