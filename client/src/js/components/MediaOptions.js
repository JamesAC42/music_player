import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settingsActions } from '../actions/actions.js';

const mapStateToProps = (state, props) => ({
    loop: state.settings.loop,
    queue: state.settings.queue,
    shuffle: state.settings.shuffle,
    volume: state.settings.volume,
    muted: state.settings.muted,
    volumeStore: state.settings.volumeStore
})

const mapDispatchToProps = {
    toggleMute: settingsActions.toggleMute,
    toggleQueue: settingsActions.toggleQueue,
    toggleLoop: settingsActions.toggleLoop,
    toggleShuffle: settingsActions.toggleShuffle,
    changeVolume: settingsActions.changeVolume
}

export class MediaOptionsBind extends Component {

    changeVolume = (e) => {
        let rect = e.currentTarget.getBoundingClientRect();
        let x = e.pageX - rect.left;
        let width = e.currentTarget.offsetWidth;
        let volume = 100 * (x / width);
        this.props.changeVolume(volume);
    }

    toggleMute = () => { this.props.toggleMute(this.props.muted, this.props.volumeStore) }
    toggleShuffle = () => { 
        console.log('hello');
        console.log(this.props.shuffle);
        this.props.toggleShuffle(this.props.shuffle);
        console.log(this.props.shuffle);
    }
    toggleLoop = () => { this.props.toggleLoop(this.props.loop) }
    toggleQueue = () => { this.props.toggleQueue(this.props.queue) }

    volumeIcon(volume) {
        if(volume === 0){
            return "icons8-mute-50.png";
        } else if(volume < 50) {
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
                        alt="" 
                        onClick={this.toggleMute}/>
                    <div 
                        className="volume-bar"
                        onClick={this.changeVolume}>
                        <div 
                            className="volume-bar-inner"
                            style={{
                                width: this.props.volume + "%"
                            }}></div>
                    </div>
                </div>
            </div>
        )
    }
}

const MediaOptions = connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaOptionsBind);

export { MediaOptions as default }