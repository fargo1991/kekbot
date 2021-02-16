import "./style.css";

import React from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import Image from "./Image.jsx";
import {imageUrl} from "../../api";
import PostActionsDropdown from "./PostActionsDropdown.jsx";

const CAPTION_LENGTH = 256;

const Post = ({ id, image_id, caption,
                created, updated, author,
                is_publicated, publicated, is_deleted,
                deleted,
                onAction }) => {

    const { nickname, username } = author;

    const renderFooter = () => {
        if(is_publicated)
            return (
                <span className={"publicated-status-time"}>
                    Опубликовано {moment(publicated).format("DD.MM.yyyy HH:mm:ss")}
                </span>);
        if(is_deleted)
            return (
                <span className={"publicated-status-time"}>
                    Удалено {moment(deleted).format("DD.MM.yyyy HH:mm:ss")}
                </span>);

           return <PostActionsDropdown postId={id} onAction={onAction}/>
    };

  return(
      <div className={`post-list-item ${is_deleted && 'deleted'}`}>
          <div className="post-title">
              <span className="post-id"><Link to={`/post/edit/${id}`}>#{id}</Link></span>
              <span>от <b>{ nickname ? `@${nickname}` : username} </b></span>
              <span className="post-created">{moment(created).format("DD.MM.yyyy HH:mm:ss")}</span>
          </div>
          <div className="post-content">
              <div className={'image-container'}>
                  <Image path={imageUrl(image_id)}/>
              </div>
              <div className={'caption-container'}>
                  { renderCaption(caption) }
              </div>
          </div>
          <div className="post-footer">
              { renderFooter() }
          </div>
      </div>
  )

};

function renderCaption(caption){
    const _caption = caption.length >= CAPTION_LENGTH
                    ? caption.substring(0, CAPTION_LENGTH)
                    : caption;

    return _caption.split(`\n`)
        .map( (substr, idx) => { return <>{substr}<br/></> }
        );
}

export default Post;