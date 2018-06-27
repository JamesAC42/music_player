import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    dataActions,
    viewActions
} from '../actions/actions.js';
import '../../css/PlaylistSelect.css';

const mapStateToProps = (state, props) => ({
    hold: state.data.hold,
    playlistSelect: state.view.playlistSelect,
    data: state.data
})

const mapDispatchToProps = {
    togglePlaylistSelect: viewActions.togglePlaylistSelectVisible,
    updateData: dataActions.updateData,
    toggleSuccessModal: viewActions.toggleSuccessModal
}

export class PlaylistSelectBind extends Component {

    addToPlaylist = (e) => {
        let playlist = e.target.innerHTML;
        let songs = this.props.hold;
        fetch('/addToPlaylist', {
            method: 'POST',
            body: JSON.stringify({
                playlist,
                songs
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.props.updateData(response);
            this.props.togglePlaylistSelect(true);
            this.props.toggleSuccessModal(false);
            setTimeout(() => {
                this.props.toggleSuccessModal(true);
            },2000);
        });
    }

    renderPlaylists = () => {
        let playlists = Object.keys(this.props.data.playlists);
        let items = playlists.map(playlist => 
            <li
                key={playlist}
                onClick={this.addToPlaylist}>
                {playlist}</li>
        );
        return items;
    }

    render(){
        if(!this.props.playlistSelect) return null;
        return(
            <div className="playlist-select">
                <div className="playlist-select-header">
                    Select playlist:
                </div>
                <div className="playlist-select-list">
                    <ul>
                        { this.renderPlaylists() }
                    </ul>
                </div>
                <div 
                    className="exit-button"
                    onClick={() => this.props.togglePlaylistSelect(true)}>
                    <img alt="" src={window.location.origin + "/icons/icons8-cancel-64.png"} />
                </div>
            </div>
        )
    }
}

const PlaylistSelect = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistSelectBind);

export { PlaylistSelect as default }