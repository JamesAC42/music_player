import React, { Component } from 'react';

export class MusicItemKey extends Component {
  render() {
    return (
      <div className="music-item-key">
        <div className="music-item-info info-padding"></div>
        <div className="music-item-info music-item-title">
            Title
        </div>
        <div className="music-item-info info-padding"></div>
        <div className="music-item-info music-item-artist">
            Artist
        </div>
        <div className="music-item-info info-padding"></div>                        
        <div className="music-item-info music-item-album">
            Album
        </div>
      </div>
    )
  }
}

export default class MusicItem extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.playItem = this.playItem.bind(this);
    this.playItemNext = this.playItemNext.bind(this);
    this.addItemToQueue = this.addItemToQueue.bind(this);
    this.addItemToPlaylist = this.addItemToPlaylist.bind(this);
    this.state = {
      optionsVisible: false,
      removeItemVisible: false
    }
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
  }

  showOptions() {
    this.setState({optionsVisible:true});
  }

  hideOptions() {
    this.setState({optionsVisible:false})
  }

  removeItem() {

  }

  playItem(e) {
    let number = e.currentTarget.getAttribute("number");
    this.props.playItem(number);
  }

  playItemNext() {
    return;
  }

  addItemToQueue() {
    return;
  }

  addItemToPlaylist() {
    return;
  }

  render() {
    let isPlaylist = this.props.activeCatgory === "playlists";
    let musicItemClass = "music-item";
    if((this.props.number === this.props.activeSong) && this.props.queue) {
      musicItemClass += " music-item-active"
    }
    let optionsContainerClass = "options-container";
    if(this.state.optionsVisible) optionsContainerClass += 
      " options-container-visible";
    return (
      <div 
        className={musicItemClass} 
        number={this.props.number} 
        onClick={this.playItem} >

        {
          (isPlaylist || this.props.queue ) &&
            <div 
              className="music-item-delete"
              onClick={this.removeItem}>
              <img 
                src={window.location.origin + "/icons/icons8-cancel-50.png"}
                alt="" />
            </div>
        }

        <div className="music-item-info info-padding"></div>
        <div className="music-item-info music-item-title">
          {this.props.item.title}
        </div>
        <div className="music-item-info info-padding"></div>
        <div className="music-item-info music-item-artist">
          {this.props.item.artist}
        </div>
        <div className="music-item-info info-padding"></div>
        <div className="music-item-info music-item-album">
          {this.props.item.album}
        </div>
        <div 
          className="music-item-options"
          onMouseEnter={this.showOptions}
          onMouseLeave={this.hideOptions}>
          <div className={optionsContainerClass}>
            <div className="options-container-inner">
              <div className="tail"></div>
              <div className="options-list options-list-index">
                <div className="add-to-playlist">Add to Playlist</div>
                <div className="add-to-queue">Add to Queue</div>
                <div className="play-next">Play Next</div>
              </div>
            </div>
          </div> 
          <img 
            src={window.location.origin + "/icons/icons8-more-filled-50.png"} 
            alt=""/>
        </div>
      </div>
    )
  }
}