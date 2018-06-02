import React, { Component } from 'react';
import './css/NowPlaying.css';

class SongInfo extends Component {
    render() {
        return(
            <div className="song-info">
                <div className="song-album-cover">
                    <img src={window.location.origin + this.props.item.cover} alt="No Cover" />
                </div>
                <div className="song-info">
                    <div className="song-title">
                        {this.props.item.title}
                    </div>
                    <div className="song-artist">
                        {this.props.item.artist}
                    </div>
                </div>
            </div>
        )
    }
}

class MediaControls extends Component {

    constructor(props) {
        super(props);
        this.previousSong = this.previousSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.seek = this.seek.bind(this);
        this.state = {
            hoverTime: ""
        }
        this.changeHoverTime = this.changeHoverTime.bind(this);
    }

    previousSong() {

    }

    nextSong() {

    }

    togglePlay() {

    }

    seek() {

    }

    changeHoverTime() {

    }

    render() {
        let path = window.location.origin + "/icons/";
        return(
            <div className="media-controls">
                <div className="media-controls-inner">
                    <div className="control-buttons">
                        <div 
                            className="skip-back control-disabled"
                            onClick={this.previousSong}>
                            <img src={path + "icons8-skip-to-start-50.png"} alt="" />
                        </div>
                        <div 
                            className="toggle-play control-disabled"
                            onClick={this.togglePlay}>
                            <img src={path + "icons8-circled-play-filled-50.png"} alt="" />
                        </div>
                        <div 
                            className="skip-forward control-disabled"
                            onClick={this.nextSong}>
                            <img src={path + "icons8-end-50.png"} alt="" />
                        </div>
                    </div>
                    <div className="seek-outer">
                        <div className="current-time">
                            {this.props.currentTime}
                        </div>
                        <div 
                            className="seek-bar"
                            onMouseMove={this.changeHoverTime}>
                            <div className="seek-bar-inner"></div>
                            <div className="seek-hover">
                                <div className="seek-hover-inner">
                                    <div className="seek-hover-tail"></div>
                                    <div className="seek-hover-time">
                                        {this.state.hoverTime}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="song-time">
                            {this.props.length}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class MediaOptions extends Component {

    constructor(props) {
        super(props);
        this.toggleShuffle = this.toggleShuffle.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
        this.toggleQueue = this.toggleQueue.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
    }

    toggleShuffle() {

    }

    toggleLoop() {

    }

    toggleQueue() {

    }

    changeVolume() {

    }

    volumeIcon(volume) {
        if(volume === 0){
            return "icons8-mute-50.png";
        } else if(volume < 0.5) {
            return "icons8-low-volume-50.png";
        } else {
            return "icons8-audio-50.png";
        }
    }

    render() {
        let path = window.location.origin + "/icons/";
        return(
            <div className="media-options">
                <div 
                    className="queue"
                    onClick={this.toggleQueue}>
                    <img className="disabled" src={path + "icons8-menu-50.png"} />
                </div>
                <div 
                    className="shuffle"
                    onClick={this.toggleShuffle}>
                    <img className="disabled" src={path + "icons8-shuffle-50.png"} alt="" />
                </div>
                <div 
                    className="loop"
                    onClick={this.toggleLoop}>
                    <img className="disabled" src={path + "icons8-repeat-50.png"} alt="" />
                </div>
                <div className="volume">
                    <img className="volume-icon" src={path + this.volumeIcon(this.props.volume)} alt="" />
                    <div 
                        className="volume-bar"
                        onClick={this.changeVolume}>
                        <div className="volume-bar-inner"></div>
                    </div>
                </div>
            </div>
        )
    }
}

class NowPlaying extends Component {

    constructor(props) {
        super(props);
        this.previousSong = this.previousSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.seek = this.seek.bind(this);
        this.toggleShuffle = this.toggleShuffle.bind(this);
        this.toggleQueue = this.toggleQueue.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this)
        this.changeVolume = this.changeVolume.bind(this);
    }

    previousSong() {

    }

    nextSong() {

    }

    togglePlay() {

    }

    seek() {

    }

    toggleShuffle() {

    }

    toggleQueue() {

    }

    toggleLoop() {

    }

    changeVolume() {

    }

    render(){
        let nowPlaying = this.props.nowPlaying;
        let length = nowPlaying.length;
        let item = nowPlaying.item;
        let currnetTime = nowPlaying.currentTime;
        return(
            <div className="now-playing">
                <div className="now-playing-inner">
                    <SongInfo 
                        item={item}/>
                    <MediaControls />
                    <MediaOptions />
                </div>
            </div>
        )
    }
}

export default NowPlaying;