import React, { Component } from 'react';
import './css/MusicPlayer.css';
import Sidebar from './Sidebar.js';
import IndexView from './IndexView.js';
import NowPlaying from './NowPlaying.js';
/*
import SuccessMessage from 'SuccessMessage.js';
import PlaylistSelect from 'PlaylistSelect.js';
*/

const shuffle = (list) => {
    return;
}

const decode = (name) => {
    let text = document.createElement("textarea");
    text.innerHTML = name;
    return text.value;
}

class MusicPlayer extends Component {

    constructor(props) {
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
            activeCategory: null,
            activeIndex: null,
            activeSong: null,
            queueVisible: false,
            queue: [],
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
            loop:false,
            shuffle:false,
            volume: 1
        };
        this.onActiveCategoryChange = this.onActiveCategoryChange.bind(this);
        this.onActiveIndexChange = this.onActiveIndexChange.bind(this);
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

    onActiveCategoryChange(category) {
        this.setState({activeCategory:decode(category)});
    }

    onActiveIndexChange(index) {
        this.setState({activeIndex:decode(index)});
    }

    playIndex(category, index, number) {

    }

    addToQueue(songs) {

    }

    playNext(songs) {

    }

    addToPlaylist(songs) {

    }

    skipTo(number) {

    }

    nextSong() {

    }

    previousSong() {

    }

    pause() {

    }

    play() {

    }

    seekTo(time) {

    }

    toggleShuffle() {

    }

    toggleLoop() {

    }

    render() {
        return (
            <div>
                <Sidebar
                    data={this.state.data}
                    onActiveCategoryChange={this.onActiveCategoryChange}
                    onActiveIndexChange={this.onActiveIndexChange}/>
                <IndexView
                    data={this.state.data}
                    queue={this.state.queue}
                    activeCategory={this.state.activeCategory}
                    activeIndex={this.state.activeIndex}
                    activeSong={this.state.activeSong}
                    queueVisible={this.state.queueVisible}
                    playIndex={this.playIndex}
                    playSong/>
                <NowPlaying
                    nowPlaying={this.state.nowPlaying}
                    togglePlay={this.togglePlay}
                    previousSong={this.previousSong}
                    nextSong={this.nextSong}
                    seekTo={this.seekTo}
                    toggleShuffle={this.toggleShuffle}
                    toggleQueue={this.toggleQueue}
                    toggleLoop={this.toggleLoop}/>
            </div>
        );
    }
}

export default MusicPlayer;