import React, {Component} from 'react';
import './css/IndexView.css';

class IndexBackground extends Component {
  render() {
    return (
      <div className="view-background">
        <img
          src={window.location.origin + "/background/bg.jpg"}
          alt="" />
      </div>
    )
  }
}

class IndexPanel extends Component {

  constructor(props) {
    super(props);
    this.playIndex = this.playIndex.bind(this);
    this.playIndexNext = this.playIndexNext.bind(this);
    this.addToQueue = this.addToQueue.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.remove = this.remove.bind(this);
    this.showChangeName = this.showChangeName.bind(this);
    this.hideChangeName = this.hideChangeName.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  playIndex() {

  }

  playIndexNext() {

  }

  addToQueue() {

  }

  addToPlaylist() {

  }
  
  remove() {

  }

  showChangeName() {

  }

  hideChangeName() {

  }

  changeName() {

  }

  render() {
    return (
      <div className="panel">
        <div className="panel-title">
          {
            this.props.title 
          }
        </div>
        <div className="panel-title panel-title-hidden">
            <div className="panel-title-inner">
                <input id="index-rename-input" type="text" maxLength="50" />
                <div className="index-rename-submit">
                    <img
                      src={window.location.origin + "/icons/icons8-ok-50.png"}
                      alt="" />
                </div>
            </div>
        </div>
        <div className="panel-controls">
            <div id="panel-delete" className="panel-control panel-option playlist-option panel-control-hidden">
                DELETE
            </div>
            <div id="panel-rename" className="panel-control panel-option playlist-option panel-control-hidden">
                RENAME
            </div>
            <div id="panel-addtoplaylist" className="panel-control panel-option">
                ADD TO PLAYLIST
            </div>
            <div id="panel-addtoqueue" className="panel-control panel-option">
                ADD TO QUEUE
            </div>
            <div id="panel-playnext" className="panel-control panel-option">
                PLAY NEXT
            </div>
            <div className="panel-control">
                <span className="panel-play">
                    PLAY
                </span>
            </div>
        </div>
      </div>
    )
  }
}

class MusicItemKey extends Component {
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

class MusicItem extends Component {

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

  playItem() {
    return;
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
    if(this.props.number === this.props.activeSong) {
      musicItemClass += " music-item-active"
    }
    let optionsContainerClass = "options-container";
    if(this.state.optionsVisible) optionsContainerClass += 
      " options-container-visible";
    return (
      <div 
        className={musicItemClass} 
        name={this.props.id} 
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

class IndexList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="musicList">
        {
          this.props.list.map((item, index) =>
            <MusicItem
              key={index}
              number={index}
              queue={this.props.queue}
              activeSong={this.props.activeSong}
              activeCategory={this.props.activeCategory}
              item={item} />
          )
        }
      </div>
    )
  }
}

class Index extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let classHidden;
    if(this.props.queue) {
      if(this.props.queueVisible) {
        classHidden = "";
      } else {
        classHidden = " view-inner-hidden";
      }
    } else {
      if(this.props.queueVisible) {
        classHidden = " view-inner-hidden";
      } else {
        classHidden = "";
      }
    }
    return(
      <div className={"view-inner" + classHidden}>
        <div className="index-outer">
          <div className="index-inner">
            <IndexPanel
              queue={this.props.queue}
              title={this.props.title}/>
            <MusicItemKey />
            <IndexList
              list={this.props.list}
              queue={this.props.queue}
              data={this.props.data} 
              activeSong={this.props.activeSong} />
          </div>
        </div>
      </div>
    )
  }
}

class IndexView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let cat = this.props.activeCategory ? this.props.activeCategory : "";
    let index = this.props.activeIndex ? this.props.activeIndex : "";
    let itemList = [];
    if(cat && index) {
      let keyList = this.props.data[cat][index];
      itemList = keyList.map(item => {
        return this.props.data["all"][item]
      })
    }
    let queueItemList = this.props.queue.map(item => {
      return this.props.data["all"][item];
    });
    return (
      <div className="view-outer">
        <IndexBackground />
        <Index 
          queue={false}
          queueVisible={this.props.queueVisible}
          title={index}
          list={itemList}
          activeSong={this.props.activeSong}
          data={this.props.data}/>
        <Index
          queue={true}
          queueVisible={this.props.queueVisible}
          title="Play Queue"
          list={queueItemList}
          activeSong={this.props.activeSong}
          data={this.props.data}/>
      </div>
    )
  }
}

export default IndexView;