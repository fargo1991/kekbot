export function getToken(){
    return window.localStorage.getItem('token');
}

export function setToken(token){
    window.localStorage.setItem('token', token)
}