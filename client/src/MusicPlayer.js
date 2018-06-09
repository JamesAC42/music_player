import React, { Component } from 'react';
import './css/MusicPlayer.css';
import Sidebar from './Sidebar.js';
import IndexView from './IndexView.js';
import NowPlaying from './NowPlaying.js';
/*
import SuccessMessage from 'SuccessMessage.js';
import PlaylistSelect from 'PlaylistSelect.js';
*/

const decode = (name) => {
    let text = document.createElement("textarea");
    text.innerHTML = name;
    return text.value;
}

class MusicPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeCategory: null,
            activeIndex: null,
            queueVisible: false
        };
        this.onActiveCategoryChange = this.onActiveCategoryChange.bind(this);
        this.onActiveIndexChange = this.onActiveIndexChange.bind(this);
        this.playItem = this.playItem.bind(this);
        this.skipTo = this.skipTo.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.previousSong = this.previousSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.seekTo = this.seekTo.bind(this);
        this.toggleQueue = this.toggleQueue.bind(this);
        this.toggleShuffle = this.toggleShuffle.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
    }

    onActiveCategoryChange(category) {
        this.setState({activeCategory:decode(category)});
    }

    onActiveIndexChange(index) {
        this.setState({activeIndex:decode(index)});
    }

    playItem(number) {
        let cat = this.state.activeCategory;
        let index = this.state.activeIndex;
        this.props.playItem(cat, index, number);
    }

    skipTo(number) {
        this.props.skipTo(number);
    }

    playIndex() {
        if(this.props.playing === null) return;
        let cat = this.state.activeCategory;
        let index = this.state.activeIndex;
        this.props.playItem(cat, index);
    }

    addToQueue(songs) {

    }

    playNext(songs) {

    }

    addToPlaylist(songs) {

    }

    nextSong() {
        this.props.nextSong();
    }

    previousSong() {
        this.props.previousSong();
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

    toggleLoop() {
        this.props.toggleLoop();
    }

    toggleQueue(state) {
        let q;
        if(state !== undefined) {
            q = state
        } else {
            q = !this.state.queueVisible;
        }
        this.setState({queueVisible:q});
    }

    changeVolume(volume) {

    }

    render() {
        return (
            <div>
                <Sidebar
                    data={this.props.data}
                    onActiveCategoryChange={this.onActiveCategoryChange}
                    onActiveIndexChange={this.onActiveIndexChange}
                    toggleQueue={this.toggleQueue}/>
                <IndexView
                    data={this.props.data}
                    queue={this.props.queue}
                    activeCategory={this.state.activeCategory}
                    activeIndex={this.state.activeIndex}
                    activeSong={this.props.activeSong}
                    queueVisible={this.state.queueVisible}
                    playItem={this.playItem}
                    skipTo={this.skipTo}/>
                <NowPlaying
                    queue={this.state.queueVisible}
                    shuffle={this.props.shuffle}
                    loop={this.props.loop}
                    playing={this.props.playing}
                    nowPlaying={this.props.nowPlaying}
                    togglePlay={this.togglePlay}
                    previousSong={this.previousSong}
                    nextSong={this.nextSong}
                    seekTo={this.seekTo}
                    toggleShuffle={this.toggleShuffle}
                    toggleQueue={this.toggleQueue}
                    toggleLoop={this.toggleLoop}
                    changeVolume={this.changeVolume}/>
            </div>
        );
    }
}

export default MusicPlayer;