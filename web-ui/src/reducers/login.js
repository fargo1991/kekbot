import { SET_USER_AUTHORIZED } from "../actions/login.js";
import { setToken } from "../api/token.js";

const initialState = {
  isAuthorized : false,
  token : ""
}

export function login(state = initialState, action){

  switch (action.type) {

    case SET_USER_AUTHORIZED:
        setToken(action.payload.isAuthorized ? action.payload.token : "");
        return { ...state, ...action.payload };

    default:
      return state
  }

}
