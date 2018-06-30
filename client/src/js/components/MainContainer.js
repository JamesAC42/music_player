import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import MusicPlayer from './MusicPlayer.js';
import {
  playbackActions,
  dataActions,
  queueActions
} from '../actions/actions.js';

const mapStateToProps = (state, props) => ({
  nowPlaying: state.nowPlaying,
  loop: state.settings.loop,
  volume: state.settings.volume,
  data: state.data,
  queue: state.queue
})

const mapDispatchToProps = {
  updateData: dataActions.updateData,
  setDuration: playbackActions.setDuration,
  updateTime: playbackActions.updateTime,
  setPlaying: playbackActions.setPlaying,
  endPlayback: playbackActions.endPlayback,
  seekTo: playbackActions.seekTo,
  setQueue: queueActions.setQueue
}

export class MainContainerBind extends Component {
  
  componentDidMount() {
    this.getMusicLibrary()
      .then(res => {
        let data = {};
        for(let key in res) {
            data[key] = res[key]
        }
        this.props.updateData(data);
      })
      .catch(err =>  {
          console.log(err)
      });
  }

  getMusicLibrary = async () => {
      const response = await fetch('/getSongs');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
  };

  nextSong = () => {
    if(this.props.loop) {
      this.props.seekTo(0);
      return;
    }
    let index = this.props.nowPlaying.activeSong;
    if(index === this.props.queue.length - 1){
      this.props.endPlayback();
      this.props.setQueue([]);
    }else{
      let item = this.props.queue[index + 1];
      this.props.setPlaying(item, index + 1);
    }
  }

  renderSound = () => {
    if(this.props.nowPlaying.playing === null) return;
    if(this.props.nowPlaying.playing) {
      let musicItem = this.props.data.all[this.props.nowPlaying.item];
      let musicPath = musicItem.path;
      return (
        <Sound
          url={window.location.origin + "\\music" + musicPath}
          autoLoad={true}
          playStatus={Sound.status.PLAYING}
          playFromPosition={this.props.nowPlaying.currentTime}
          volume={this.props.volume}
          onLoading={(e) => {this.props.setDuration(e.duration)}}
          onPlaying={(e) => {this.props.updateTime(e.position)}}
          onFinishedPlaying={this.nextSong}/>
      )
    }
  }

  render() {
    return(
      <div>
        <MusicPlayer />
        { this.renderSound() }
      </div>
    )
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainerBind);

export { MainContainer as default }
