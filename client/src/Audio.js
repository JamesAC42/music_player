import React, { Component } from 'react';

class Audio extends Component {
  render() {
    let path = this.props.nowPlaying.item.path;
    return(
      <audio
        id="audio-src"
        src={window.location.origin + "\\music" +  path} />
    )
  }
}

export default Audio;