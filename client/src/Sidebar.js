import React, {Component} from 'react';
import './css/Sidebar.css';

class SidebarIcon extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sidebar-icon" title={this.props.title} name={this.props.title.toLowerCase()}>
                <img src={window.location.origin + this.props.src} alt="icon"/>
            </div>
        )
    }
}

class SidebarIcons extends Component {
    constructor(props) {
        super(props);
        this.changeVisibleCat = this.changeVisibleCat.bind(this);
    }

    changeVisibleCat(e) {
        let name = e.target.name;
        this.props.onVisibleCategoryChange(name);
    }

    render() {
        return (
            <div className="sidebar-icons-outer">
                <SidebarIcon
                    title="Tracks"
                    name="songs"
                    url="/icons/icons8-audio-file-24.png"
                    onClick={this.changeVisibleCat}/>
                <SidebarIcon
                    title="Albums"
                    name="albums"
                    url="/icons/icons8-music-record-24.png"
                    onClick={this.changeVisibleCat}/>
                <SidebarIcon
                    title="Artists"
                    name="artists"
                    url="/icons/icons8-user-male-24.png"
                    onClick={this.changeVisibleCat}/>
                <SidebarIcon
                    title="Playlists"
                    name="playlists"
                    url="/icons/icons8-playlist-24.png"
                    onClick={this.changeVisibleCat}/>
                <SidebarIcon
                    title="Genres"
                    name="genres"
                    url="/icons/icons8-musical-notes-24.png"
                    onClick={this.changeVisibleCat}/>
            </div>
        )
    }
}

class SidebarContentItem extends Component {
    constructor(props) {
        super(props)
    }

    listItems(category) {
        let keys = Object.keys(category);
        if(!keys.length) return;
        return (
            keys.map(item => 
                <li key={item}>{item}</li>
            )
        )
    }

    render() {
        return (
            <div 
                id={"sidebar-" + this.props.name} 
                className={"sidebar-content " + 
                    (this.props.name == this.props.active) ? 
                    "sidebar-content-active" : ""} >
                <div className="sidebar-header">
                    <span>{this.props.content}</span>
                </div>
                <div className="sidebar-list">
                    <ul id={this.props.name + "-list"}>
                        {this.listItems(this.props.data[this.props.name])}
                    </ul>
                </div>
            </div>
        )
    }
}

class SidebarContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sidebar-content-outer">
                <SidebarContentItem
                    name="songs"
                    content="Tracks"
                    data={this.props.data} />
                <SidebarContentItem
                    name="albums"
                    content="Albums"
                    data={this.props.data} />
                <SidebarContentItem
                    name="artists"
                    content="Artists"
                    data={this.props.data} />
                <SidebarContentItem
                    name="playlists"
                    content="Playlists"
                    data={this.props.data} />
                <SidebarContentItem
                    name="genres"
                    content="Genres"
                    data={this.props.data} />   
            </div>
        )
    }
}

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:"tracks"
        }
        this.onActiveCategoryChange = this.onActiveCategoryChange.bind(this);
        this.onVisibleCategoryChange = this.onVisibleCategoryChange.bind(this);
    }

    onActiveCategoryChange(category) {

    }

    onVisibleCategoryChange(category) {
        this.setState({visible:category});
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-navbar">
                    <SidebarIcons visible={this.state.visible} />
                </div>
                <div className="sidebar-content-outer">
                    <div id="sidebar-songs" className="sidebar-content sidebar-content-active">
                        <div className="sidebar-header">
                            <span>Songs</span>
                        </div>
                        <div className="sidebar-list">
                            <ul id="track-list">
                                {this.listItems(this.props.data.songs)}
                            </ul>
                        </div>
                    </div>
                    <div id="sidebar-albums" className="sidebar-content">
                        <div className="sidebar-header">
                            <span>Albums</span>
                        </div>
                        <div className="sidebar-list">
                            <ul id="album-list">
                                {this.listItems(this.props.data.albums)}
                            </ul>
                        </div>
                    </div>
                    <div id="sidebar-artists" className="sidebar-content">
                        <div className="sidebar-header">
                            <span>Artists</span>
                        </div>
                        <div className="sidebar-list">
                            <ul id="artist-list">
                                {this.listItems(this.props.data.artists)}
                            </ul>
                        </div>
                    </div>
                    <div id="sidebar-playlists" className="sidebar-content">
                        <div className="sidebar-header">
                            <span>Playlists</span>
                            <div className="new-playlist-toggle">
                                NEW
                            </div>
                        </div>
                        <div className="new-playlist-form">
                            <input type="text" className="new-playlist-name" placeholder="Playlist Name" maxLength="50"/>
                            <div className="new-playlist-submit">ADD</div>
                        </div>
                        <div id="playlist-list-outer" className="sidebar-list">
                            <ul id="playlist-list">
                                {this.listItems(this.props.data.playlists)}
                            </ul>
                        </div>
                    </div>
                    <div id="sidebar-genres" className="sidebar-content">
                        <div className="sidebar-header">
                            <span>Genres</span>
                        </div>
                        <div className="sidebar-list">
                            <ul id="genre-list">
                                {this.listItems(this.props.data.genres)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;