import { 
    createStore,
    combineReducers
} from 'redux';
import data from './reducers/data';
import queue from './reducers/queue';
import view from './reducers/view';
import nowPlaying from './reducers/nowPlaying';
import settings from './reducers/settings';

let initState = {
    data: {
        songs:{},
        albums:{},
        artists:{},
        playlists:{},
        genres:{},
        all:{},
        hold: []   
    },
    queue: [],
    view: {
        activeCategory: 'songs',
        visibleCategory: 'songs',
        activeIndex: undefined,
        playlistSelect: false,
        successModal: false,
        background: ""
    },
    nowPlaying:{
        playing: false,
        activeSong: undefined,
        item: undefined,
        length: undefined,
        currentTime: undefined
    },
    settings: {
        queue: false,
        loop: false,
        shuffle: false,
        muted: false,
        volumeStore: 100,
        volume: 100
    }
}

const musicReducer = combineReducers({
    data,
    queue,
    view,
    nowPlaying,
    settings
});

const configureStore = (reducer, initstate) => {
    return createStore(reducer, initstate);
}

export default configureStore(musicReducer, initState);
