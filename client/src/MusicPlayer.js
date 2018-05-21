import React, { Component } from 'react';
import './css/MusicPlayer.css';
import Sidebar from './Sidebar.js';
/*
import IndexView from 'IndexView.js';
import NowPlayingBar from 'NowPlayingBar.js';
import SuccessMessage from 'SuccessMessage.js';
import PlaylistSelect from 'PlaylistSelect.js';
*/

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
            "visibleCategory":null,
            "activeIndex": null,
            "activeSong": null,
            "queue": [],
            "nowPlaying":{}
        };
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

    render() {
        return (
            <div>
                <Sidebar data={this.state.data}/>
            </div>
        );
    }
}

export default MusicPlayer;