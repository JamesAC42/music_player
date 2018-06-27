import React, { Component } from 'react';
import { connect } from 'react-redux';
import MusicItem, { MusicItemKey } from './MusicItem.js';
import IndexPanel from './IndexPanel.js';
import {
  viewActions
} from '../actions/actions.js'
import '../../css/IndexView.css';

const mapStateToProps = (state, props) => ({
  queueVisible: state.settings.queue,
  queue: state.queue,
  data: state.data,
  activeIndex: state.view.activeIndex,
  activeCategory: state.view.activeCategory,
  background: state.view.background
})

const mapDispatchToProps = {
  setBackground: viewActions.setBackground
}

export class IndexBackground extends Component {
  render() {
    return (
      <div className="view-background">
        <img
          src={window.location.origin + "/background/" + this.props.background}
          alt="" />
      </div>
    )
  }
}

export class IndexViewBind extends Component {

  componentDidMount() {
    fetch('/getWallpapers')
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      this.props.setBackground(response);
    });
  }
  
  componentDidUpdate(){
    this.scroll.scrollTop = 0;
  }

  render() {
    let list = [];
    if(this.props.activeIndex) {
      list = this.props.queueVisible ?
      this.props.queue :
      this.props.data[this.props.activeCategory][this.props.activeIndex];
    }
    return (
      <div className="view-outer">
        <IndexBackground background={this.props.background}/>
        <div className="view-inner">
          <div className="index-outer">
            <div className="index-inner">
              <IndexPanel />
              <MusicItemKey />
              <div className="music-list" ref={scroll => this.scroll = scroll}>
                {
                  list.map((item, index) =>
                    <MusicItem
                      key={index}
                      id={item}
                      index={index}/>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const IndexView = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexViewBind);

export { IndexView as default }