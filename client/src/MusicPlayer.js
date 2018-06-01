import React, { Component } from 'react';
import './css/MusicPlayer.css';
import Sidebar from './Sidebar.js';
import IndexView from './IndexView.js';
/*
import NowPlayingBar from 'NowPlayingBar.js';
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
                "songs":{},
                "albums":{},
                "artists":{},
                "playlists":{},
                "genres":{},
                "all":{}    
            },
            "activeCategory": null,
            "activeIndex": null,
            "activeSong": null,
            "queueVisible": false,
            "queue": [],
            "nowPlaying":{}
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
                    queueVisible={this.state.queueVisible}/>
            </div>
        );
    }
}

export default MusicPlayer;