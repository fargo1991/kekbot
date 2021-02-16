import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./layout/layout.jsx";
import Suggestions from "./suggestions/suggestions.jsx";

import Posts from "./posts/posts.jsx";
import CreatePost from "./posts/CreatePost.jsx";
import EditPost from "./posts/EditPost.jsx";

import Chats from "./chats/chats.jsx";

import Notes from './notes/notes.jsx';
import CreateNote from "./notes/createNote.jsx";

import Settings from "./settings/settings.jsx";

import { getToken } from "../api/token.js";

export default function(props){

  if(!getToken())
      return <Redirect to={'/login'}/>;

  return(
    <Layout>
      <div className="dashboard">
          <Switch>
            <Route path="/" component={Suggestions} exact={true}/>
            <Route path="/suggestions" component={Suggestions}/>
            <Route path={"/posts"} component={Posts} exact={true}/>
            <Route path={"/posts/create/:suggestionId"} component={CreatePost} exact={true}/>
            <Route path={"/post/edit/:postId"} component={EditPost} exact={true}/>
            <Route path={"/chats"} component={Chats} exact={true}/>
            <Route path="/notes" component={Notes} exact={true}/>
            <Route path="/notes/create" component={CreateNote} exact={true} />
            <Route path="/settings" component={Settings} exact={true} />
          </Switch>
      </div>
    </Layout>
  )

}
