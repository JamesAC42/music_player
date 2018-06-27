import { handleActions } from 'redux-actions';
import playlist from './playlist.js';

const data = handleActions(
    {
        UPDATE_DATA: (state, action) => ({
            ...action.payload.data
        }),

        ADD_PLAYLIST: (state, action) => ({
            ...state,
            playlists: playlist(state.playlists, action)
        }),

        REMOVE_PLAYLIST: (state, action) => ({
            ...state,
            playlists: playlist(state.playlists, action)
        }),

        ADD_TO_PLAYLIST:(state, action) => ({
            ...state,
            playlists: playlist(state.playlists, action)
        }),

        REMOVE_FROM_PLAYLIST: (state, action) => ({
            ...state,
            playlists: playlist(state.playlists, action)
        }),

        RENAME_PLAYLIST: (state, action) => ({
            ...state,
            playlists: playlist(state.playlists, action)
        }),

        SET_HOLD: (state, action) => ({
            ...state,
            hold: action.payload.songs
        })
    },
    {
        songs:{},
        albums:{},
        artists:{},
        playlists:{},
        genres:{},
        all:{},
        hold: []
    }
)

export { data as default }
