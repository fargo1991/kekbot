import { SET_SUGGESTION, SET_POST_WAS_EDITED, RESET_STATE,
         SET_TEXT, CANCEL } from "../actions/createPost.js";

const initialState = {
    suggestion: {
      approved: null,
      created: null,
      deleted: null,
      id: null,
      image_id: null,
      is_publicated: false,
      text: "",
      user_id: null,
      nickname : "",
      username : ""
    },
    text : '',
    wasEdited : false
};

export function createPost(state = initialState, action){
    switch (action.type) {
        case SET_SUGGESTION:
            return {
                ...state,
                suggestion: action.payload,
                text : action.payload.text
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
                text : state.suggestion.text,
                wasEdited: false
            };
        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
}

