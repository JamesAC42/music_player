import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    viewActions,
    dataActions
} from '../actions/actions.js';

const mapStateToPropsCat = (state, props) => ({
    visibleCategory: state.view.visibleCategory
})

const mapDispatchToPropsCat = {
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
    mapStateToPropsCat,
    mapDispatchToPropsCat
)(SidebarIconBind);

const mapDispatchToPropsRefresh = {
    updateData: dataActions.updateData,
    resetView: viewActions.resetView
}

export class RefreshButtonBind extends Component {
    refreshLibrary = () => {
        fetch('/refreshData')   
        .then(res => {
            console.log(res);
            return res.json();
        })
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log("yoyo ", response);
            this.props.resetView();
            //this.props.updateData(response);
        });
    }
    render(){
        return(
            <div className="refresh-outer" onClick={this.refreshLibrary}>
                <img src={window.location.origin + "/icons/icons8-synchronize-52.png"} alt="" title="Refresh Library"/>
            </div>
        )
    }
}

export const RefreshButton = connect(
    null,
    mapDispatchToPropsRefresh
)(RefreshButtonBind)

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
