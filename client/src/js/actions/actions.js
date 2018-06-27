import { createActions } from 'redux-actions';

export const playbackActions = createActions(
    {
        SET_PLAYING: (item, index) => ({ item, index }),
        SET_ACTIVE: index => ({ index }),
        SEEK_TO: time => ({ time }),
        TOGGLE_PLAY: isPlaying => ({ isPlaying }),
        SET_DURATION: duration => ({ duration }),
        UPDATE_TIME: time => ({ time })
    },
    'PLAY',
    'PAUSE',
    'END_PLAYBACK'
);

export const queueActions = createActions(
    {
        ADD_TO_QUEUE: songs => ({ songs }),
        ADD_TO_UPNEXT: (songs, index) => ({ songs, index }),
        REMOVE_FROM_QUEUE: index => ({ index }),
        SET_QUEUE: songs => ({ songs })
    }
)

export const dataActions = createActions(
    {
        UPDATE_DATA: data => ({ data }),
        ADD_PLAYLIST: name => ({ name }),
        REMOVE_PLAYLIST: name => ({ name }),
        RENAME_PLAYLIST: (name, newName) => ({ name, newName }),
        SET_HOLD: songs => ({ songs })
    }
)

export const playlistActions = createActions(
    {
        ADD_TO_PLAYLIST: (name, songs) => ({ name, songs }),
        REMOVE_FROM_PLAYLIST: (name, index) => ({ name, index })
    }
)

export const settingsActions = createActions(
    {
        CHANGE_VOLUME: volume => ({ volume }),
        TOGGLE_MUTE: (muted, volumeStore) => ({ muted, volumeStore }),
        TOGGLE_QUEUE: queueVisible => ({ queueVisible }),
        TOGGLE_SHUFFLE: shuffleOn => ({ shuffleOn }),
        TOGGLE_LOOP: loopOn => ({ loopOn })
    }
)

export const viewActions = createActions(
    {
        CHANGE_ACTIVE_CATEGORY: category => ({ category }),
        CHANGE_VISIBLE_CATEGORY: category => ({ category }),
        CHANGE_ACTIVE_INDEX: index => ({ index }),
        TOGGLE_PLAYLIST_SELECT_VISIBLE: visible => ({ visible }),
        TOGGLE_SUCCESS_MODAL: visible => ({ visible }),
        SET_BACKGROUND: fileName => ({ fileName })
    },
    'RESET_VIEW'
)
