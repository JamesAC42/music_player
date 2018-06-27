import { handleActions } from 'redux-actions';

const settings = handleActions(
    {
        CHANGE_VOLUME: (state, action) => ({
            ...state,
            muted: false,
            volumeStore: action.payload.volume,
            volume: action.payload.volume
        }),

        TOGGLE_MUTE: (state, action) => {
            let volume = action.payload.muted ? action.payload.volumeStore : 0;
            return {
                ...state,
                volume,
                muted: !action.payload.muted
            }
        },

        TOGGLE_QUEUE: (state, action) => ({
            ...state,
            queue: !action.payload.queueVisible
        }),

        TOGGLE_SHUFFLE: (state, action) => ({
            ...state,
            shuffle: !action.payload.shuffleOn
        }),

        TOGGLE_LOOP: (state, action) => ({
            ...state,
            loop: !action.payload.loopOn
        })
    },
    {
        queue: false,
        loop: false,
        shuffle: false,
        muted: false,
        volumeStore: 100,
        volume: 100
    }
)

export { settings as default }
