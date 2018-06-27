import { handleActions } from 'redux-actions';

const view = handleActions(
    {
        CHANGE_ACTIVE_CATEGORY: (state, action) => ({
            ...state,
            activeCategory: action.payload.category
        }),

        CHANGE_VISIBLE_CATEGORY: (state, action) => ({
            ...state,
            visibleCategory: action.payload.category
        }),

        CHANGE_ACTIVE_INDEX: (state, action) => ({
            ...state,
            activeIndex: action.payload.index
        }),

        TOGGLE_PLAYLIST_SELECT_VISIBLE: (state, action) => ({
            ...state,
            playlistSelect: !action.payload.visible
        }),

        RESET_VIEW: (state) => ({
            ...state,
            activeCategory: 'songs',
            activeIndex: undefined
        }),

        TOGGLE_SUCCESS_MODAL: (state, action) => ({
            ...state,
            successModal: !action.payload.visible
        }),

        SET_BACKGROUND: (state, action) => ({
            ...state,
            background: action.payload.fileName
        })

    },
    {
        activeCategory: 'songs',
        visibleCategory: 'songs',
        activeIndex: undefined,
        playlistSelect: false,
        successModal: false,
        background: ""
    }
)

export { view as default }
