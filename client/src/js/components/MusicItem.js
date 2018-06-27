import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  playbackActions,
  queueActions,
  dataActions,
  playlistActions,
  viewActions
} from '../actions/actions.js';
import { shuffle } from '../tools.js';

const mapStateToProps = (state, props) => ({
  queueVisible: state.settings.queue,
  data: state.data,
  queue: state.queue,
  activeCategory: state.view.activeCategory,
  activeIndex: state.view.activeIndex,
  activeSong: state.nowPlaying.activeSong,
  shuffle: state.settings.shuffle
})

const mapDispatchToProps = {
  setPlaying: playbackActions.setPlaying,
  setActive: playbackActions.setActive,
  endPlayback: playbackActions.endPlayback,
  addToQueue: queueActions.addToQueue,
  setQueue: queueActions.setQueue,
  removeFromQueue: queueActions.removeFromQueue,
  addToUpnext: queueActions.addToUpnext,
  setHold: dataActions.setHold,
  removeFromPlaylist: playlistActions.removeFromPlaylist,
  togglePlaylistSelectVisible: viewActions.togglePlaylistSelectVisible
}

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

export class MusicItemBind extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionsVisible: false,
      removeItemVisible: false,
      optionsPositionClass: "options-container-top"
    }
  }

  getSongList = () => {
    let list = this.props.data[this.props.activeCategory][this.props.activeIndex];
    if(this.props.shuffle) {
      list  = shuffle(list);
      list.splice(0,0,this.props.id);
    }
    return list;
  }

  playItem = () => {
    let index = this.props.index;
    if(!this.props.queueVisible){
      let list = this.getSongList();
      this.props.setQueue(list);
      if(this.props.shuffle) index = 0;
    }
    this.props.setPlaying(this.props.id, index);
  }

  addToPlaylist = (e) => {
    this.props.togglePlaylistSelectVisible(false);
    this.props.setHold([this.props.id]);
    e.stopPropagation();
  }

  addToQueue = (e) => {
    if(this.props.queue.length === 0) this.props.setPlaying(this.props.id, 0);
    this.props.addToQueue([this.props.id]);
    e.stopPropagation();
  }

  playNext = (e) => {
    if(this.props.queue.length === 0) this.props.setPlaying(this.props.id, 0);
    this.props.addToUpnext([this.props.id], this.props.activeSong);
    e.stopPropagation();
  }

  toggleOptionView = () => {
    const optionsVisible = !this.state.optionsVisible;
    this.setState({optionsVisible});
    const top = this.item.getBoundingClientRect().top;
    if(top < 400) {
      this.setState({optionsPositionClass:"options-container-bottom"});
    } else {
      this.setState({optionsPositionClass:"options-container-top"})
    }
  }

  removeItem = (e) => {
    if(this.props.queueVisible){
      if(this.props.index < this.props.activeSong) {
        this.props.setActive(this.props.activeSong - 1);
      }
      if(this.props.index === this.props.activeSong) {
        const index = this.props.index;
        if(index === this.props.queue.length - 1) {
          this.props.endPlayback();
          this.props.setQueue([]);
        } else {
          this.props.setPlaying(this.props.queue[index + 1], index);
        }
      }
      this.props.removeFromQueue(this.props.index);
    } else {
      this.props.removeFromPlaylist(this.props.activeIndex, this.props.index);
    }
    e.stopPropagation();
  }

  renderRemoveButton = () => {
    if(this.props.activeCategory === "playlists" || this.props.queueVisible) {
      return (
        <div 
          className="music-item-delete"
          onClick={this.removeItem}>
          <img 
            src={window.location.origin + "/icons/icons8-cancel-50.png"}
            alt="" />
        </div>
      )
    }
  }

  render() {

    let musicItemClass = "music-item";
    if((this.props.index === this.props.activeSong) && this.props.queueVisible) {
      musicItemClass += " music-item-active"
    }
    let optionsContainerClass = "options-container " + this.state.optionsPositionClass;
    if(this.state.optionsVisible) optionsContainerClass += 
      " options-container-visible";
    const item = this.props.data.all[this.props.id];

    return (
      <div 
        className={musicItemClass} 
        index={this.props.index} 
        onClick={this.playItem}
        ref={item => this.item = item} >

        { this.renderRemoveButton() }

        <div className="music-item-info info-padding"></div>
        <div className="music-item-info music-item-title">
          {item.title}
        </div>
        <div className="music-item-info info-padding"></div>
        <div className="music-item-info music-item-artist">
          {item.artist}
        </div>
        <div className="music-item-info info-padding"></div>
        <div className="music-item-info music-item-album">
          {item.album}
        </div>
      
        <div 
          className="music-item-options"
          onMouseEnter={this.toggleOptionView}
          onMouseLeave={this.toggleOptionView}>
          <div 
            className={optionsContainerClass}>
            <div className="options-container-inner">

              <div className="options-list options-list-index">
                <div 
                  className="add-to-playlist"
                  onClick={this.addToPlaylist}>
                    Add to Playlist
                </div>
                <div 
                  className="add-to-queue"
                  onClick={this.addToQueue}>
                    Add to Queue
                </div>
                <div 
                  className="play-next"
                  onClick={this.playNext}>
                    Play Next
                </div>
                {
                  (this.props.queueVisible || this.props.activeCategory === "playlists") &&
                    <div 
                    className="remove-item"
                    onClick={this.removeItem}>
                      Remove Item
                    </div>
                }
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

const MusicItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicItemBind);

export { MusicItem as default }