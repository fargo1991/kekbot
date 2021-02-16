import axios from "axios";

export const PROTOCOL = 'http://';
// export const PROTOCOL = 'https://';
export const API_URL = API_HOST_URL;
export const IMAGE_API_URL = `${PROTOCOL}${API_HOST_URL}/api/v1/image`;

import { getToken } from "./token.js";

let request = axios.create({
  baseURL : `${PROTOCOL}${API_URL}`
});

request.interceptors.response.use(
    response => { return response; },
    error => {
      if(
        error.response &&
        error.response.status === 401 &&
        window.location.pathname !== '/login'
      ) {
        localStorage.clear();
        setTimeout(function () {
          window.location = '/login';
        }, 500);
      }
      return Promise.reject(error);
    });

export function getSuggestions(filters){

  return request.get("/api/v1/suggestions", {
    params : filters,
    headers: {
      "Authorization" : getToken()
    }
  });
}

export function postSuggestion(suggestionId){
  return request.post("/api/v1/suggestion/post", {
    id : suggestionId
  },{
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : getToken()
        }
  });
}

export function login(loginData){
  return request.post("/api/v1/login", loginData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function postNote(note){
  return request.post("/api/v1/note", note, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : getToken()
    }
  })
}

export function getNotes(){
  return request.get("/api/v1/notes", {
    headers: {
      "Authorization" : getToken()
    }
  });
}

export function getSettings(){
  return request.get("/api/v1/settings", {
    headers: {
      "Authorization" : getToken()
    }
  });
}

export function getGlobalStatSuggestionsCates(){
  return request.get("/api/v1/suggestions/stat/general/cates_count", {
    headers: {
      "Authorization" : getToken()
    }
  });
}

export function getSuggestion(id){
  return request.get(`/api/v1/suggestion/${id}`,{
    headers : {
      "Authorization" : getToken()
    }
  })
}

export function deleteSuggestion(id){
  return request.delete(`/api/v1/suggestion/${id}`, {
    headers : {
      "Authorization" : getToken()
    }
  })
}

export function imageUrl(image_id){
  return `${IMAGE_API_URL}/${getToken()}/${image_id}`
}

export function tgImageUrl(tg_image_id){
  return `${PROTOCOL}${API_URL}/${getToken()}/api/v1/tg_image/${tg_image_id}`
}

export function createPost(data){
  return request.post("/api/v1/post", data, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : getToken()
    }
  })
}

export function getPost(id){
  return request.get(`/api/v1/post/${id}`, {
    headers : {
      "Authorization" : getToken()
    }
  })
}

export function savePost(post){
  return request.put(`/api/v1/post/${post.id}`, post, {
    headers : {
      "Authorization" : getToken()
    }
  });
}

export function getPosts(filters){
  return request.get("/api/v1/posts", {
    params : filters,
    headers: {
      "Authorization" : getToken()
    }
  });
}

export function getGlobalStatPostsCates(){
  return request.get('/api/v1/posts/stat/general/cates_count', {
    headers: {
      "Authorization" : getToken()
    }
  });
}

export function publicPost(postId){
  return request.post('/api/v1/post/public/',{
    id : postId
  },{
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : getToken()
    }
  })
}

export function deletePost(id){
  return request.delete(`/api/v1/post/${id}`, {
    headers : {
      "Authorization" : getToken()
    }
  })
}

export function getTgUsers(){
  return request.get(`/api/v1/tg_users`, {
    headers: {
      "Authorization" : getToken()
    }
  });
}

export function getTgUserMessages(tg_user_id){
  return request.get(`/api/v1/chat/messages/${tg_user_id}`, {
    headers: {
      "Authorization" : getToken()
    }
  });
}
