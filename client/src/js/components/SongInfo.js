import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => ({
    queue: state.queue,
    activeSong: state.nowPlaying.activeSong,
    data: state.data.all
});

class SongInfoBind extends Component {
    render() {
        let coverPath = window.location.origin;
        let id = this.props.queue[this.props.activeSong];
        let item = id ? this.props.data[id] : {};
        if(this.props.activeSong !== undefined && item.cover) {
            coverPath += "/covers" + item.cover;
        } else {
            coverPath += "/defaultAlbum.jpg";
        }
        return(
            <div className="song-info">
                <div className="song-album-cover">
                    <img src={coverPath} alt="No Cover" />
                </div>
                <div className="song-info">
                    <div className="song-title">
                        {item.title}
                    </div>
                    <div className="song-artist">
                        {item.artist}
                    </div>
                </div>
            </div>
        )
    }
}

const SongInfo = connect(
    mapStateToProps
)(SongInfoBind);

export { SongInfo as default }