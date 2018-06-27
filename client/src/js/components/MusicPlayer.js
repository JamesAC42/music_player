import React, { Component } from 'react';
import '../../css/MusicPlayer.css';
import Sidebar from './Sidebar';
import IndexView from './IndexView';
import NowPlaying from './NowPlaying';
import PlaylistSelect from './PlaylistSelect';
import SuccessMessage from './SuccessMessage';

class MusicPlayer extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <IndexView />
                <NowPlaying />
                <PlaylistSelect />
                <SuccessMessage />
            </div>
        );
    }
}

export default MusicPlayer;