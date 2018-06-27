import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decode } from '../tools.js';
import {
    viewActions,
    settingsActions,
    dataActions
} from '../actions/actions.js';

const mapStateToProps = (state, props) => ({
    visibleCategory: state.view.visibleCategory,
    data: state.data,
    background: state.view.background
});

const mapDispatchToProps = {
    changeActiveCategory: viewActions.changeActiveCategory,
    changeActiveIndex: viewActions.changeActiveIndex,
    toggleQueue: settingsActions.toggleQueue,
    updateData: dataActions.updateData
}

export class SidebarBackground extends Component {
    render(){
        return (
            <div className="sidebar-background">
                <img
                    src={window.location.origin + "/background/" + this.props.background}
                    alt="" />
            </div>
        )
    }
}

export class SidebarContentItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newPlaylistName: "",
            playlistFormVisible: false
        }
    }

    changeActiveIndex = (e) => {
        let index = e.target.innerHTML;
        this.props.onActiveIndexChange(index);
    }

    listItems = (category) => {
        let keys = Object.keys(category);
        if(!keys.length) return;
        return (
            keys.map(item => 
                <li key={item} onClick={this.changeActiveIndex}>{item}</li>
            )
        )
    }

    toggleFormVisble = () => {
        let playlistFormVisible = !this.state.playlistFormVisible;
        this.setState({playlistFormVisible});
    }

    updateName = (e) => {
        this.setState({newPlaylistName: e.target.value});
    }

    submitName = () => {
        if(!this.state.newPlaylistName) return;
        this.props.submitName(this.state.newPlaylistName);
        this.form.value = "";
    }

    renderForm = () => {
        if(this.state.playlistFormVisible){
            return(
                <div className="new-playlist-form">
                    <input 
                        type="text" 
                        className="new-playlist-name" 
                        placeholder="Playlist Name" 
                        maxLength="50" 
                        onChange={this.updateName}
                        ref={form => this.form = form}/>
                    <div className="new-playlist-submit" onClick={this.submitName}>ADD</div>
                </div>   
            )
        }
    }

    render() {
        let classNames = "sidebar-content";
        if(this.props.name === this.props.visible) {
            classNames += " sidebar-content-active";
        }
        return (
            <div 
                id={"sidebar-" + this.props.name} 
                className={classNames} >

                <div className="sidebar-header">    
                    <span>{this.props.content}</span>
                    {this.props.name === "playlists" && 
                        <div 
                            className="new-playlist-toggle"
                            onClick={this.toggleFormVisble}>
                            { this.state.playlistFormVisible ? "HIDE" : "NEW" }
                        </div>
                    }
                </div>

                {this.renderForm()}

                <div className="sidebar-list">
                    <ul id={this.props.name + "-list"}>
                        {this.listItems(this.props.data)}
                    </ul>
                </div>

            </div>
        )
    }
}

export class SidebarContentBind extends Component {

    onActiveIndexChange = (index) => {
        this.props.changeActiveIndex(decode(index));
        this.props.changeActiveCategory(this.props.visibleCategory);
        this.props.toggleQueue(true);
    }

    submitName = (name) => {
        let playlists = Object.keys(this.props.data.playlists);
        if(playlists.indexOf(name) !== -1) return;
        fetch('/addPlaylist', {
            method: 'POST',
            body: JSON.stringify({
                playlistName: name
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => { 
            this.props.updateData(response)
        });
    }

    render() {
        return (
            <div className="sidebar-content-outer">
                <SidebarBackground background={this.props.background}/>
                <SidebarContentItem
                    name="songs"
                    content="Tracks"
                    visible={this.props.visibleCategory}
                    data={this.props.data.songs}
                    onActiveIndexChange={this.onActiveIndexChange}/>
                <SidebarContentItem
                    name="albums"
                    content="Albums"
                    visible={this.props.visibleCategory}
                    data={this.props.data.albums}
                    onActiveIndexChange={this.onActiveIndexChange}/>
                <SidebarContentItem
                    name="artists"
                    content="Artists"
                    visible={this.props.visibleCategory}
                    data={this.props.data.artists} 
                    onActiveIndexChange={this.onActiveIndexChange}/>
                <SidebarContentItem
                    name="playlists"
                    content="Playlists"
                    visible={this.props.visibleCategory}
                    data={this.props.data.playlists} 
                    onActiveIndexChange={this.onActiveIndexChange}
                    submitName={this.submitName}/>
                <SidebarContentItem
                    name="genres"
                    content="Genres"
                    visible={this.props.visibleCategory}
                    data={this.props.data.genres} 
                    onActiveIndexChange={this.onActiveIndexChange}/>   
            </div>
        )
    }
}

const SidebarContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarContentBind);

export { SidebarContent as default }
