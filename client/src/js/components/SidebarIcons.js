import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewActions } from '../actions/actions.js';

const mapStateToProps = (state, props) => ({
    visibleCategory: state.view.visibleCategory
})

const mapDispatchToProps = {
    changeVisibleCategory: viewActions.changeVisibleCategory
}

export class SidebarIconBind extends Component {
    render() {
        let classActive = this.props.visibleCategory === this.props.name ? " sidebar-icon-active" : "";
        return (
            <div 
                className={"sidebar-icon" + classActive}
                title={this.props.title}
                onClick={() => this.props.changeVisibleCategory(this.props.name)}>

                <img 
                    src={window.location.origin + this.props.src}
                    alt="icon" />
            </div>
        )
    }
}

export const SidebarIcon = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarIconBind);

export default class SidebarIcons extends Component {
    render() {
        return (
            <div className="sidebar-navbar">
                <div className="sidebar-icons-outer">
                    <SidebarIcon
                        title="Tracks"
                        name="songs"
                        src="/icons/icons8-audio-file-52.png" />
                    <SidebarIcon
                        title="Albums"
                        name="albums"
                        src="/icons/icons8-music-record-52.png" />
                    <SidebarIcon
                        title="Artists"
                        name="artists"
                        src="/icons/icons8-person-52.png" />
                    <SidebarIcon
                        title="Playlists"
                        name="playlists"
                        src="/icons/icons8-playlist-52.png" />
                    <SidebarIcon
                        title="Genres"
                        name="genres"
                        src="/icons/icons8-musical-notes-52.png" />
                </div>
            </div>
        )
    }
}
