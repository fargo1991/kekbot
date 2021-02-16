import { combineReducers } from "redux";
import { login } from "./login.js";
import { ui } from "./ui.js";
import { suggestions } from './suggestions.js';
import { posts } from "./posts.js";
import { createPost } from "./createPost.js";
import { editPost } from "./editPost.js";
import { chats } from "./chats.js";

export default combineReducers({
  login,
  ui,
  suggestions,
  posts,
  createPost,
  editPost,
  chats
})
