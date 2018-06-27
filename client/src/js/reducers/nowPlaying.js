import { handleActions } from 'redux-actions';

const nowPlaying = handleActions(
    {
        PLAY: (state) => ({
            ...state,
            playing: true
        }),

        PAUSE: (state) => ({
            ...state,
            playing: false
        }),

        TOGGLE_PLAY: (state, action) => ({
            ...state,
            playing: !action.payload.isPlaying
        }),

        SET_PLAYING: (state, action) => ({
            ...state,
            playing: true,
            activeSong: action.payload.index,
            item: action.payload.item,
            currentTime: 0
        }),

        SET_ACTIVE: (state, action) => ({
            ...state,
            activeSong: action.payload.index
        }),

        SEEK_TO: (state, action) => ({
            ...state,
            currentTime: action.payload.time
        }),

        END_PLAYBACK: (state, action) => ({
            playing: false,
            activeSong: undefined,
            item: undefined,
            length: undefined,
            currentTime: undefined
        }),

        SET_DURATION: (state, action) => ({
            ...state,
            length: action.payload.duration
        }),

        UPDATE_TIME: (state, action) => ({
            ...state,
            currentTime: action.payload.time
        })
    },
    {
        playing: false,
        activeSong: undefined,
        item: undefined,
        length: undefined,
        currentTime: undefined
    }
)

export { nowPlaying as default }
