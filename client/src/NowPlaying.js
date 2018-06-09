import React, { Component } from 'react';
import { status } from 'react-sound';
import './css/NowPlaying.css';

class SongInfo extends Component {
    render() {
        let coverPath = window.location.origin + "/covers";
        if(this.props.item.cover) {
            coverPath += this.props.item.cover;
        } else {
            coverPath += "/default.png";
        }
        return(
            <div className="song-info">
                <div className="song-album-cover">
                    <img src={coverPath} alt="No Cover" />
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
        this.seekTo = this.seekTo.bind(this);
        this.state = {
            hoverVisible: false,
            hoverTransform: 0,
            hoverTime: ""
        }
        this.getHoverTime = this.getHoverTime.bind(this);
        this.toggleHoverVisible = this.toggleHoverVisible.bind(this);
        this.changeHoverTime = this.changeHoverTime.bind(this);
        this.getProgress = this.getProgress.bind(this);
    }

    previousSong() {
        this.props.previousSong();
    }

    nextSong() {
        this.props.nextSong();
    }

    togglePlay() {
        this.props.togglePlay();
    }

    toggleHoverVisible() {
        let hoverVisible = !this.state.hoverVisible;
        this.setState({hoverVisible});
    }

    getHoverTime(e) {
        let rect = e.currentTarget.getBoundingClientRect();
        let x = e.pageX - rect.left;
        let width = e.currentTarget.offsetWidth;
        let percent = x / width;
        let time = this.props.length * percent;
        return({time, x});
    } 
    
    seekTo(e) {
        let t = this.getHoverTime(e);
        this.props.seekTo(t.time);
    }

    changeHoverTime(e) {
        let t = this.getHoverTime(e);
        this.setState({
            hoverTime: t.time,
            hoverTransform: t.x
        });
    }

    formatTime(seconds) {
        let total = seconds / 1000;
        let m = total < 60 ? 0 : Math.floor(total / 60);
        let mString = (m < 10) ? "0" + m : m;
        let s = Math.floor(total % 60);
        let sString = (s < 10) ? "0" + s : s;
        let time = mString + ":" + sString;
        return time;
    }

    getProgress() {
        let currentTime = this.props.currentTime;
        let totalTime = this.props.length;
        let percent = Math.floor(100 * (currentTime / totalTime));
        return(percent + "%");
    }

    render() {
        let path = window.location.origin + "/icons/";
        let controlEnabled = this.props.playing === null ?
            " control-disabled" : "";
        let seekClass = "seek-hover";
        if(this.props.playing !== null && this.state.hoverVisible) {
            seekClass += " seek-hover-visible"
        }
        let togglePlaySrc = this.props.playing ? 
            "icons8-pause-button-filled-50.png" :
            "icons8-circled-play-filled-50.png";
        return(
            <div className="media-controls">
                <div className="media-controls-inner">
                    <div className="control-buttons">
                        <div 
                            className={"skip-back" + controlEnabled}
                            onClick={this.previousSong}>
                            <img 
                                src={path + "icons8-skip-to-start-50.png"}
                                alt="" />
                        </div>
                        <div 
                            className={"toggle-play" + controlEnabled}
                            onClick={this.togglePlay}>
                            <img 
                                src={path + togglePlaySrc}
                                alt="" />
                        </div>
                        <div 
                            className={"skip-forward" + controlEnabled}
                            onClick={this.nextSong}>
                            <img 
                                src={path + "icons8-end-50.png"} 
                                alt="" />
                        </div>
                    </div>
                    <div className="seek-outer">
                        <div className="current-time">
                            {this.formatTime(this.props.currentTime)}
                        </div>
                        <div 
                            className="seek-bar"
                            onMouseEnter={this.toggleHoverVisible}
                            onMouseLeave={this.toggleHoverVisible}
                            onMouseMove={this.changeHoverTime}
                            onClick={this.seekTo}>
                            <div 
                                className="seek-bar-inner"
                                style={{width: this.getProgress()}}>
                            </div>
                            <div 
                                className={seekClass}
                                style={{
                                    transform: 
                                        "translateX(" +
                                        (this.state.hoverTransform + 10) +
                                        "px) translateY(-45px)"
                                }}>
                                <div className="seek-hover-inner">
                                    <div className="seek-hover-tail"></div>
                                    <div className="seek-hover-time">
                                        {this.formatTime(this.state.hoverTime)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="song-time">
                            {this.formatTime(this.props.length)}
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
        this.props.toggleShuffle();
    }

    toggleLoop() {
        this.props.toggleLoop();
    }

    toggleQueue() {
        this.props.toggleQueue();
    }

    changeVolume(e) {

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
                    <img 
                        className={this.props.queue ? "" : "disabled"}
                        src={path + "icons8-menu-50.png"}
                        alt="" />
                </div>
                <div 
                    className="shuffle"
                    onClick={this.toggleShuffle}>
                    <img 
                        className={this.props.shuffle ? "" : "disabled"}
                        src={path + "icons8-shuffle-50.png"}
                        alt="" />
                </div>
                <div 
                    className="loop"
                    onClick={this.toggleLoop}>
                    <img 
                        className={this.props.loop ? "" : "disabled"}
                        src={path + "icons8-repeat-50.png"}
                        alt="" />
                </div>
                <div className="volume">
                    <img 
                        className="volume-icon" 
                        src={path + this.volumeIcon(this.props.volume)} 
                        alt="" />
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

export default class NowPlaying extends Component {

    constructor(props) {
        super(props);
        this.previousSong = this.previousSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.seekTo = this.seekTo.bind(this);
        this.toggleShuffle = this.toggleShuffle.bind(this);
        this.toggleQueue = this.toggleQueue.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this)
        this.changeVolume = this.changeVolume.bind(this);
    }

    previousSong() {
        this.props.previousSong();
    }

    nextSong() {
        this.props.nextSong();
    }

    togglePlay() {
        this.props.togglePlay();
    }

    seekTo(time) {
        this.props.seekTo(time);
    }

    toggleShuffle() {
        this.props.toggleShuffle();
    }

    toggleQueue() {
        this.props.toggleQueue();
    }

    toggleLoop() {
        this.props.toggleLoop();
    }

    changeVolume(volume) {
        this.props.changeVolume(volume);
    }

    render(){
        let nowPlaying = this.props.nowPlaying;
        let item = nowPlaying.item;
        let length = nowPlaying.length;
        let currentTime = nowPlaying.currentTime;
        return(
            <div className="now-playing">
                <div className="now-playing-inner">
                    <SongInfo 
                        item={item}/>
                    <MediaControls
                        playing={this.props.playing}
                        length={length}
                        currentTime={currentTime}
                        previousSong={this.previousSong}
                        nextSong={this.nextSong}
                        togglePlay={this.togglePlay}
                        seekTo={this.seekTo}/>
                    <MediaOptions
                        loop={this.props.loop}
                        queue={this.props.queue}
                        shuffle={this.props.shuffle}
                        toggleShuffle={this.toggleShuffle}
                        toggleQueue={this.toggleQueue}
                        toggleLoop={this.toggleLoop}
                        changeVolume={this.changeVolume}/>
                </div>
            </div>
        )
    }
}