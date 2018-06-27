import React, { Component } from 'react';
import '../../css/NowPlaying.css';
import SongInfo from './SongInfo.js';
import MediaControls from './MediaControls.js';
import MediaOptions from './MediaOptions.js';

export default class NowPlaying extends Component {
    render(){
        return(
            <div className="now-playing">
                <div className="now-playing-inner">
                    <SongInfo />
                    <MediaControls />
                    <MediaOptions />
                </div>
            </div>
        )
    }
}