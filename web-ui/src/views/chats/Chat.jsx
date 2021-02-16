// start 12:07

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from "moment";

import { getTgUserMessages, tgImageUrl } from '../../api';
import { setMessages, setMessagesLoading } from "../../actions/chats.js";

import { message, Spin, Empty } from "antd";

const Chat = connect(
  state => {
    return {
      messages : state.chats.chat.messages,
      loading : state.chats.chat.messagesLoading,
      tgUserId : state.chats.selectedTgUserId
    }
  },
  dispatch => {
    return {
      setMessages: bindActionCreators(setMessages, dispatch),
      setMessagesLoading:  bindActionCreators(setMessagesLoading, dispatch)
    }
  }
)(
  ({ messages, loading, tgUserId,
     setMessages, setMessagesLoading }) => {

    useEffect(() => {

      if(!tgUserId) {
        setMessagesLoading(false);
        return;
      }

      setMessagesLoading(true);
      getTgUserMessages(tgUserId)
        .then(
          result => {
            setMessagesLoading(false);
            setMessages(result.data);
          },
          error => {
            setMessagesLoading(false);
            message.error('Произошла ошибка при попытке загрузить чат с пользователем')
          }
        )

    }, [tgUserId]);

    return(
      <Spin spinning={loading}>
        <div className="tg-user-chat">
          {
            messages.length ?
              messages.map(
                m => (
                  <div className={`chat-message ${m.is_from_user ? 'fromUser' : ''}`}>
                    <div className='chat-message-date'>
                      { moment.unix((m.date)).format('DD MMM YYYY HH:mm:ss') }
                    </div>
                    { m.photo ? (
                      <>
                        {/*<img src={'https://api.telegram.org/file/bot1343983358:AAFUVbZs7pBvhF2ppza7WdhkA_3ELHHFapg/photos/file_242'}/>*/}
                        <img src={`${tgImageUrl(JSON.parse(m.photo)[0].file_id)}`}/>
                        {/*<img src={`base64,${tgImageUrl(JSON.parse(m.photo)[0].file_id)}`}/>*/}
                        <i>[Пользователь прикрепил фото]</i>
                      </>) :
                      m.text }
                  </div>
                )) : <Empty description={'Нет сообщений'}/>
          }
        </div>
      </Spin>
    )

  }
);

export default Chat;