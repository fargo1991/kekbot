import { SET_POST, SET_POST_WAS_EDITED, RESET_STATE,
    SET_TEXT, CANCEL } from "../actions/editPost.js";

const initialState = {
    post: {
        id: null,
        caption : '',
        image_id: null,
        author : {
            username : '',
            nickname : ''
        },
    },
    text : '',
    wasEdited : false
};

export function editPost(state = initialState, action){
    switch (action.type) {
        case SET_POST:
            return {
                ...state,
                post: action.payload,
                text : action.payload.caption
            };
        case SET_POST_WAS_EDITED:
            return {
                ...state,
                wasEdited: action.payload
            };
        case SET_TEXT:
            return {
                ...state,
                text: action.payload,
                wasEdited : action.payload != state.text
            };
        case CANCEL:
            return {
                ...state,
                text : state.post.caption,
                wasEdited: false
            };
        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
}

