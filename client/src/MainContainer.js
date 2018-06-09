import React, { Component } from 'react';
import MusicPlayer from './MusicPlayer.js';
import Sound from 'react-sound';

const shuffle = (list) => {
  let newArray = list.slice(0);
  let j = 0;
  let temp = null;
  for(let i = newArray.length - 1; i > 0; i-=1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
  }
  return newArray;
}

export default class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        songs:{},
        albums:{},
        artists:{},
        playlists:{},
        genres:{},
        all:{}    
      },
      queue: [],
      activeSong: null,
      playing: null,
      nowPlaying:{
          item: {
              title: "",
              cover: "",
              path: "",
              artist: "",
              album: "",
              genre: []
          },
          length: null,
          currentTime: null
      },
      loop: false,
      shuffle: false,
      volume: 100
    }
    this.playItem = this.playItem.bind(this);
    this.skipTo = this.skipTo.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.seekTo = this.seekTo.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
    this.toggleShuffle = this.toggleShuffle.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.endPlayback = this.endPlayback.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.previousSong = this.previousSong.bind(this);
  }
  
  componentDidMount() {
    this.getMusicLibrary()
    .then(res => {
        let dataTemp = this.state.data;
        for(let key in res) {
            dataTemp[key] = res[key]
        }
        this.setState({data: dataTemp});
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

  playItem(category, index, number) {

    let list = this.state.data[category][index];
    let id = list[number];
    let item = this.state.data.all[id];
    let n = parseInt(number);

    if(this.state.shuffle) {
      list = shuffle(list);
      list.splice(n, 1);
      list.splice(0,0, id);
      n = 0;
    };

    let nowPlaying = {
      item,
      currentTime: 0,
      length: 0
    }

    this.setState({
      playing:true,
      nowPlaying,
      queue: list,
      activeSong: n
    });
  }

  playIndex(category, index) {
    
  }

  skipTo(number) {
    let id = this.state.queue[number];
    let item = this.state.data.all[id];
    let nowPlaying = {
      item,
      currentTime: 0,
      length: 0
    }
    this.setState({
        nowPlaying,
        playing:true,
        activeSong: parseInt(number)
    });
  }

  endPlayback() {
    this.setState({
      activeSong: null,
      playing: null,
      nowPlaying:{
          item: {
              title: "",
              cover: "",
              path: "",
              artist: "",
              album: "",
              genre: []
          },
          length: null,
          currentTime: null
      },
    })
  }

  togglePlay() {
    if(this.state.playing === null) return;
    let playing = !this.state.playing;
    this.setState({playing});
  }

  seekTo(time) {
    let nowPlaying = this.state.nowPlaying;
    nowPlaying.currentTime = time;
    this.setState({nowPlaying});
  }
  
  changeVolume(volume) {
    this.setState({volume});
  }

  setDuration(e) {
    let nowPlaying = this.state.nowPlaying;
    nowPlaying.length = e.duration;
    this.setState({nowPlaying});
  }

  updateTime(e) {
    let nowPlaying = this.state.nowPlaying;
    nowPlaying.currentTime = e.position;
    this.setState({nowPlaying});
  }
  
  toggleLoop() {
    let l = !this.state.loop;
    this.setState({loop:l});
  }

  toggleShuffle() {
    let s = !this.state.shuffle;
    this.setState({shuffle:s});
  }

  nextSong() {
    if(this.state.playing === null) return;
    if(this.state.activeSong === (this.state.queue.length - 1)) {
      this.setState({
        queue: [],
        activeSong: null
      });
      this.endPlayback();
    } else {
      let activeSong = this.state.activeSong + 1;
      this.setState({activeSong});
      this.skipTo(activeSong);
    }
  }

  previousSong() {
    if(this.state.playing === null) return;
    if((this.state.nowPlaying.currentTime / 1000) > 2 || !this.state.activeSong) {
      this.seekTo(0);
    } else {
      let activeSong = this.state.activeSong - 1;
      this.setState({activeSong});
      this.skipTo(activeSong);
    }
  }

  renderSound() {
    if(this.state.playing === null) return;
    if(this.state.playing) {
      let musicPath = this.state.nowPlaying.item.path;
      return (
        <Sound
          url={window.location.origin + "\\music" + musicPath}
          playStatus={Sound.status.PLAYING}
          playFromPosition={this.state.nowPlaying.currentTime}
          loop={this.state.loop}
          volume={this.state.volume}
          onLoading={this.setDuration}
          onPlaying={this.updateTime}
          onFinishedPlaying={this.nextSong}/>
      )
    }
  }

  render() {
    return(
      <div>
        <MusicPlayer
          data={this.state.data}
          queue={this.state.queue}
          activeSong={this.state.activeSong}
          playing={this.state.playing}
          loop={this.state.loop}
          shuffle={this.state.shuffle}
          volume={this.state.volume}
          nowPlaying={this.state.nowPlaying}
          playItem={this.playItem}
          skipTo={this.skipTo}
          togglePlay={this.togglePlay}
          toggleLoop={this.toggleLoop}
          toggleShuffle={this.toggleShuffle}
          seekTo={this.seekTo}
          changeVolume={this.changeVolume}
          endPlayback={this.endPlayback}
          nextSong={this.nextSong}
          previousSong={this.previousSong}/>
        {
          this.renderSound()
        }
      </div>
    )
  }
}