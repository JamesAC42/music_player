import { handleActions } from 'redux-actions';

const queue = handleActions(
    {
        ADD_TO_QUEUE: (state, action) => ([
            ...state,
            ...action.payload.songs
        ]),

        ADD_TO_UPNEXT: (state, action) => ([
            ...state.slice(0, action.payload.index + 1),
            ...action.payload.songs,
            ...state.slice(action.payload.index + 1)
        ]),

        REMOVE_FROM_QUEUE: (state, action) => ([
            ...state.slice(0, action.payload.index),
            ...state.slice(action.payload.index + 1)
        ]),

        SET_QUEUE: (state, action) => ([
            ...action.payload.songs
        ])

    },
    []
)

export { queue as default }
