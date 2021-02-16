import React, { useState } from 'react';
import moment from "moment";

import {IMAGE_API_URL, imageUrl, postSuggestion} from "../../api";

import {Button, message} from "antd";
import { SendOutlined } from "@ant-design/icons";
import { getToken } from "../../api/token.js";

import Image from "./Image.jsx";
import SuggestionActionsDropdown from "./SuggestionActionsDropdown.jsx";

export default ({ id, nickname, username, created, image_id, text,
                  is_publicated, is_deleted, publicated, deleted,
                  onAction }) =>  {

    const token = getToken(),
          [ publishingInProgress, setPublishingInProgress ] = useState(false);


    const renderFooter = () => {
        if(is_publicated)
            return (
                <span className={"publicated-status-time"}>
                    В публикациях {moment(publicated).format("DD.MM.yyyy HH:mm:ss")}
                </span>
            );
        if(is_deleted)
            return (
                <span className={"publicated-status-time"}>
                    Удалено {moment(deleted).format("DD.MM.yyyy HH:mm:ss")}
                </span>
            );

        return <SuggestionActionsDropdown suggestionId={id} onAction={onAction}/>
    };

    return (
        <div className="suggestion">
            <div className="suggestion-title">
                <span className="suggestion-id">#{id}</span>
                <span>от <b>{ nickname ? `@${nickname}` : username} </b></span>
                <span className="suggestion-created">{moment(created).format("DD.MM.yyyy HH:mm:ss")}</span>
            </div>
            <div className={`suggestion-content ${text ? (text.length > 256 ? 'overflow-scroll' : '') : ''} )`}>
                <p><Image path={imageUrl(image_id)}/></p>
                <p className={'suggestion-content-caption'}>{text ? text : <i>Подпись не указана</i>}</p>
            </div>
            <div className="suggestion-footer">
                { renderFooter() }
            </div>
        </div>
    )
}