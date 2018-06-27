import { handleActions } from 'redux-actions';

const updatePlaylist = handleActions(
    {
        ADD_TO_PLAYLIST: (state, action) => ([
            ...state,
            action.payload.songs
        ]),

        REMOVE_FROM_PLAYLIST: (state, action) => ([
            ...state.slice(0, action.payload.index),
            ...state.slice(action.payload.index + 1)
        ])
    },
    []
)

const playlist = handleActions(
    {
        ADD_PLAYLIST: (state, action) => ({
            ...state,
            [action.payload.name]:[]
        }),

        REMOVE_PLAYLIST: (state, action) => {
            const { [action.payload.name]:value, ...newObject } = state;
            return newObject;
        },

        ADD_TO_PLAYLIST: (state, action) => ({
            ...state,
            [action.payload.name] : updatePlaylist(state[action.payload.name], action)
        }),

        REMOVE_FROM_PLAYLIST: (state, action) => ({
            ...state,
            [action.payload.name] : updatePlaylist(state[action.payload.name], action)
        }),

        RENAME_PLAYLIST: (state, action) => {
            const { [action.payload.name]:value, ...newObject } = state;
            return {
                ...newObject,
                [action.payload.newName]: value
            }
        }
    },
    {}
)

export { playlist as default }
