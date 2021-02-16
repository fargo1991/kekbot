import "./style.css";
import React, { useEffect, useState } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { setTopNavigationActiveLink } from "../../actions/ui";
import { setTgUsers, setTgUsersLoading } from "../../actions/chats";

import { getTgUsers } from '../../api';

import { Spin, message } from 'antd';

import TgUsers from "./TgUsers.jsx";
import Chat from "./Chat.jsx";

export default connect(
  state => {
    return {
      tgUsers : state.chats.tgUsers,
      tgUsersLoading : state.chats.tgUsersLoading
    }
  },
  dispatch => {
    return {
      setTopNavigationActiveLink : bindActionCreators(setTopNavigationActiveLink, dispatch),
      setTgUsers: bindActionCreators(setTgUsers, dispatch),
      setTgUsersLoading: bindActionCreators(setTgUsersLoading, dispatch)
    }
  }
)(
  ({ tgUsers, tgUsersLoading,
     setTopNavigationActiveLink, setTgUsers, setTgUsersLoading }) => {

    useEffect(() => {

      setTopNavigationActiveLink('/chats');
      setTgUsersLoading(true);

      getTgUsers()
        .then(
          result => {
            setTgUsers(result.data);
            setTgUsersLoading(false);
          },
          err => {
            setTgUsersLoading(false);
            message.error('Не удалось загрузить список чатов. Ошибка сервера')
          }
        )


    },[]);

    return(
      <div className="chats-page">
        <TgUsers/>
        <Chat/>
      </div>
    )

  }
)