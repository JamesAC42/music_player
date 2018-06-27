import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    playbackActions,
    queueActions
} from '../actions/actions.js';

const mapStateToProps = (state, props) => ({
    nowPlaying: state.nowPlaying,
    queue: state.queue
})

const mapDispatchToProps = {
    setQueue: queueActions.setQueue,
    setPlaying: playbackActions.setPlaying,
    seekTo: playbackActions.seekTo,
    togglePlay: playbackActions.togglePlay,
    endPlayback: playbackActions.endPlayback
}

class MediaControlsBind extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hoverVisible: false,
            hoverTransform: 0,
            hoverTime: 0
        }
    }

    previousSong = () => {
        if(this.props.nowPlaying.item === undefined) return;
        if((this.props.nowPlaying.currentTime / 1000) > 2 || !this.props.nowPlaying.activeSong) {
            this.props.seekTo(0);
        } else {
            let activeSong = this.props.nowPlaying.activeSong - 1;
            this.props.setPlaying(this.props.queue[activeSong], activeSong);
        }
    }

    nextSong = () => {
        if(this.props.nowPlaying.item === undefined) return;
        let index = this.props.nowPlaying.activeSong;
        if(index === this.props.queue.length - 1) {
            this.props.endPlayback();
            this.props.setQueue([]);
        } else {
            let item = this.props.queue[index + 1];
            this.props.setPlaying(item, index + 1);
        }
    }

    toggleHoverVisible = () => {
        let hoverVisible = this.props.nowPlaying.item === undefined ? false : !this.state.hoverVisible;
        this.setState({hoverVisible});
    }
    
    seekTo = () => {
        if(this.props.nowPlaying.item === undefined) return;
        this.props.seekTo(this.state.hoverTime);
    }

    togglePlay = () => {
        if(this.props.nowPlaying.item === undefined) return;
        this.props.togglePlay(this.props.nowPlaying.playing)
    }

    changeHoverTime = (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.pageX - rect.left;
        let width = e.currentTarget.offsetWidth;
        let percent = x / width;
        let time = this.props.nowPlaying.length * percent;
        this.setState({
            hoverTime: time,
            hoverTransform: x
        });
    }

    formatTime = (seconds) => {
        if(seconds === undefined) return "00:00";
        let total = seconds / 1000;
        let m = total < 60 ? 0 : Math.floor(total / 60);
        let mString = (m < 10) ? "0" + m : m;
        let s = Math.floor(total % 60);
        let sString = (s < 10) ? "0" + s : s;
        let time = mString + ":" + sString;
        return time;
    }

    getProgress = () => {
        let currentTime = this.props.nowPlaying.currentTime;
        let totalTime = this.props.nowPlaying.length;
        let percent = Math.floor(100 * (currentTime / totalTime));
        return(percent + "%");
    }

    render() {
        let path = window.location.origin + "/icons/";
        let controlEnabled = this.props.nowPlaying.item === undefined ?
            " control-disabled" : "";
        let seekClass = "seek-hover";
        if(this.props.nowPlaying.item !== undefined && this.state.hoverVisible) {
            seekClass += " seek-hover-visible"
        }
        let togglePlaySrc = this.props.nowPlaying.playing ? 
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
                    <div 
                        className="seek-outer">
                        <div className="current-time">
                            {this.formatTime(this.props.nowPlaying.currentTime)}
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
                                        (this.state.hoverTransform + 2) +
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
                            {this.formatTime(this.props.nowPlaying.length)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const MediaControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaControlsBind);

export { MediaControls as default }
