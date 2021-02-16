import { SET_TOP_NAVIGATION_ACTIVE_LINK } from "../actions/ui.js";

const initialState = {
    activeLink : "/"
};

export function ui(state = initialState, action){

    switch (action.type) {

        case SET_TOP_NAVIGATION_ACTIVE_LINK:
            return {
                ...state,
                activeLink: action.payload
            };

        default:
            return state
    }

}