import React, {Component} from 'react';
import MusicItem, {MusicItemKey} from './MusicItem.js';
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

class IndexList extends Component {

  constructor(props) {
    super(props);
    this.playItem = this.playItem.bind(this);
  }

  playItem(number) {
    this.props.playItem(number);
  }

  render() {
    return(
      <div className="musicList">
        {
          this.props.list.map((item, index) =>
            <MusicItem
              key={index}
              id={item}
              number={index}
              queue={this.props.queue}
              activeSong={this.props.activeSong}
              activeCategory={this.props.activeCategory}
              item={this.props.data.all[item]} 
              playItem={this.playItem} />
          )
        }
      </div>
    )
  }
}

class Index extends Component {

  constructor(props) {
    super(props);
    this.playItem = this.playItem.bind(this);
  }

  playItem(number) {
    this.props.playItem(number);
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
              activeSong={this.props.activeSong} 
              playItem={this.playItem} />
          </div>
        </div>
      </div>
    )
  }
}

export default class IndexView extends Component {

  constructor(props) {
    super(props);
    this.playItem = this.playItem.bind(this);
    this.skipTo = this.skipTo.bind(this);
  }

  playItem(number) {
    this.props.playItem(number);
  }

  skipTo(number) {
    this.props.skipTo(number);
  }

  render() {
    let cat = this.props.activeCategory ? this.props.activeCategory : "";
    let index = this.props.activeIndex ? this.props.activeIndex : "";
    let itemList = [];
    if(cat && index) itemList = this.props.data[cat][index];
    return (
      <div className="view-outer">
        <IndexBackground />
        <Index 
          queue={false}
          queueVisible={this.props.queueVisible}
          title={index}
          list={itemList}
          activeSong={this.props.activeSong}
          data={this.props.data}
          playItem={this.playItem}/>
        <Index
          queue={true}
          queueVisible={this.props.queueVisible}
          title="Play Queue"
          list={this.props.queue}
          activeSong={this.props.activeSong}
          data={this.props.data}
          playItem={this.skipTo}/>
      </div>
    )
  }
}