
export const SET_TG_USERS = 'CHATS::SET_TG_USERS';
export function setTgUsers(tg_users){
  return {
    type : SET_TG_USERS,
    payload : tg_users
  }
}

export const SET_TG_USERS_LOADING = 'CHATS::SET_TG_USERS_LOADING';
export function setTgUsersLoading(loading){
  return {
    type : SET_TG_USERS_LOADING,
    payload : loading
  }
}

export const SET_MESSAGES  = 'CHATS::SET_MESSAGES';
export function setMessages(messages){
  return {
    type: SET_MESSAGES,
    payload: messages
  }
}

export const SET_MESSAGES_LOADING = 'CHATS::SET_MESSAGES_LOADING';
export function setMessagesLoading(loading){
  return {
    type : SET_MESSAGES_LOADING,
    payload : loading
  }
}

export const SELECT_USER = 'CHATS::SELECT_USER';
export function selectUser(tg_user_id) {
  return {
    type : SELECT_USER,
    payload : tg_user_id
  }
}