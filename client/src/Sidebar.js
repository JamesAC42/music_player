import React, {Component} from 'react';
import './css/Sidebar.css';

class SidebarIcon extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let name = e.currentTarget.getAttribute("name");
        this.props.onChangeVisibleCat(name);
    }

    render() {
        let classActive = this.props.active === this.props.name ? " sidebar-icon-active" : "";
        return (
            <div 
                className={"sidebar-icon" + classActive}
                title={this.props.title}
                name={this.props.name}
                onClick={this.handleClick}>

                <img 
                    src={window.location.origin + this.props.src}
                    alt="icon" />

            </div>
        )
    }
}

class SidebarIcons extends Component {

    constructor(props) {
        super(props);
        this.onChangeVisibleCat = this.onChangeVisibleCat.bind(this);
    }

    onChangeVisibleCat(name) {
        this.props.onChangeVisibleCat(name);
    }

    render() {
        return (
            <div className="sidebar-navbar">
                <div className="sidebar-icons-outer">
                    <SidebarIcon
                        title="Tracks"
                        name="songs"
                        src="/icons/icons8-audio-file-24.png"
                        active={this.props.active}
                        onChangeVisibleCat={this.onChangeVisibleCat}/>
                    <SidebarIcon
                        title="Albums"
                        name="albums"
                        src="/icons/icons8-music-record-24.png"
                        active={this.props.active}
                        onChangeVisibleCat={this.onChangeVisibleCat}/>
                    <SidebarIcon
                        title="Artists"
                        name="artists"
                        src="/icons/icons8-user-male-24.png"
                        active={this.props.active}
                        onChangeVisibleCat={this.onChangeVisibleCat}/>
                    <SidebarIcon
                        title="Playlists"
                        name="playlists"
                        src="/icons/icons8-playlist-24.png"
                        active={this.props.active}
                        onChangeVisibleCat={this.onChangeVisibleCat}/>
                    <SidebarIcon
                        title="Genres"
                        name="genres"
                        src="/icons/icons8-musical-notes-24.png"
                        active={this.props.active}
                        onChangeVisibleCat={this.onChangeVisibleCat}/>
                </div>
            </div>
        )
    }
}

class SidebarContentItem extends Component {

    constructor(props) {
        super(props)
        this.changeActiveIndex = this.changeActiveIndex.bind(this);
        this.listItems = this.listItems.bind(this);
    }

    changeActiveIndex(e) {
        let index = e.target.innerHTML;
        this.props.onActiveIndexChange(index);
    }

    listItems(category) {
        let keys = Object.keys(category);
        if(!keys.length) return;
        return (
            keys.map(item => 
                <li key={item} onClick={this.changeActiveIndex}>{item}</li>
            )
        )
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
                </div>

                <div className="sidebar-list">
                    <ul id={this.props.name + "-list"}>
                        {this.listItems(this.props.data)}
                    </ul>
                </div>

            </div>
        )
    }
}

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.onActiveIndexChange = this.onActiveIndexChange.bind(this);
    }

    onActiveIndexChange(index) {
        this.props.onActiveIndexChange(index);
    }

    render() {
        return (
            <div className="sidebar-content-outer">
                <SidebarContentItem
                    name="songs"
                    content="Tracks"
                    visible={this.props.visible}
                    data={this.props.data.songs}
                    onActiveIndexChange={this.onActiveIndexChange}/>
                <SidebarContentItem
                    name="albums"
                    content="Albums"
                    visible={this.props.visible}
                    data={this.props.data.albums}
                    onActiveIndexChange={this.onActiveIndexChange}/>
                <SidebarContentItem
                    name="artists"
                    content="Artists"
                    visible={this.props.visible}
                    data={this.props.data.artists} 
                    onActiveIndexChange={this.onActiveIndexChange}/>
                <SidebarContentItem
                    name="playlists"
                    content="Playlists"
                    visible={this.props.visible}
                    data={this.props.data.playlists} 
                    onActiveIndexChange={this.onActiveIndexChange}/>
                <SidebarContentItem
                    name="genres"
                    content="Genres"
                    visible={this.props.visible}
                    data={this.props.data.genres} 
                    onActiveIndexChange={this.onActiveIndexChange}/>   
            </div>
        )
    }
}

export default class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:"songs"
        }
        this.onActiveIndexChange = this.onActiveIndexChange.bind(this);
        this.onChangeVisibleCat = this.onChangeVisibleCat.bind(this);
    }

    onActiveIndexChange(index) {
        this.props.onActiveCategoryChange(this.state.visible);
        this.props.onActiveIndexChange(index);
        this.props.toggleQueue(false);
    }

    onChangeVisibleCat(name) {
        this.setState({visible:name});
    }

    render() {
        return (
            <div className="sidebar">
                <SidebarIcons 
                    data={this.props.data}
                    active={this.state.visible}
                    onChangeVisibleCat={this.onChangeVisibleCat}/>
                <SidebarContent
                    data={this.props.data}
                    visible={this.state.visible}
                    onActiveIndexChange={this.onActiveIndexChange}/>
            </div>
        );
    }
}