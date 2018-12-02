### `Light React Audio Player`

Components and decorators to build audio player with playlist in React.

## Install

`just clone the repo and enjoy`

## Music Player Component

Expects an array of audio files as props.

    `data: [
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
    ]`

A new state is then constructed, with neseccary properties.

#### `goPrevSong` : PropTypes.func

Callback when previous button is clicked.

#### `gonextSong` : PropTypes.func

Callback when next button is clicked.

#### `goToSong(x)` : PropTypes.func

Callback when each of the playlist items are clicked.

#### `playPause` : PropTypes.func

Callback when each the play/pause button is clicked.

#### `setVolume` : PropTypes.func

Callback when volume slider is clicked.

#### `mute` : PropTypes.func

Callback when mute is clicked. Mutes/Unmutes current audio

#### `timeUpdate` : PropTypes.func

Callback when time is updated.

#### `timeProgress` : PropTypes.func

Callback to set time progress bar accordingly

#### `formatTime` : PropTypes.func

Callback to reformat time from string to number

#### `seekTo` : PropTypes.func

Callback to seek the audio to new timing

## Running Locally

clone repo

`git clone git@github.com:felerticia/react-audio-player.git`

move into folder

`cd ~/react-audio-player`

install dependencies

`npm install`

start the server

`npm start`

open your browser and visit: `http://localhost:3000/`
