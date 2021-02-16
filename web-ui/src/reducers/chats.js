import { SET_TG_USERS, SET_TG_USERS_LOADING , SET_MESSAGES,
         SET_MESSAGES_LOADING, SELECT_USER } from "../actions/chats";

const initialState = {
  tgUsers : [],
  tgUsersLoading : true,
  selectedTgUserId : null,
  chat : {
    messages : [],
    messagesLoading : true
  }
};

export function chats(state = initialState, action){

  switch (action.type) {

    case SET_TG_USERS:
      return {
        ...state,
        tgUsers: action.payload,
        tgUsersLoading: false,
        selectedTgUserId : action.payload.length ? action.payload[0].id : null
      };

    case SET_TG_USERS_LOADING:
      return {
        ...state,
        tgUsersLoading: action.payload
      };

    case SET_MESSAGES:
      return {
        ...state,
        chat : {
          ...state.chat,
          messages : action.payload,
          messagesLoading : false
        }
      };

    case SET_MESSAGES_LOADING:
      return {
        ...state,
        chat : {
          ...state.chat,
          messagesLoading : action.payload
        }
      };

    case SELECT_USER:
      return {
        ...state,
        selectedTgUserId : action.payload
      };

    default:
      return state;

  }

}