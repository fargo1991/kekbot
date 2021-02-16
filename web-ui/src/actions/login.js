export const SET_USER_AUTHORIZED = "LOGIN::SET_USER_AUTHORIZED";

export function setUserAuthorized(isAuthorized, token){
  return {
    type : SET_USER_AUTHORIZED,
    payload : { isAuthorized , token }
  }
}
