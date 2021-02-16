import React, { useEffect, useState } from  'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { selectUser } from "../../actions/chats.js";

const TgUser = connect(
  state => {
    return {
      selectedTgUserId : state.chats.selectedTgUserId
    }
  },
  dispatch => {
    return{
      selectUser : bindActionCreators(selectUser, dispatch)
    }
  }
)(
  ({ id, tg_nickname, tg_username,
     tg_id,
     selectedTgUserId,
     selectUser }) => {

    const onSelect = () => {
      selectUser(id);
    };

    return(
      <div className={`tg-user-list-item ${ selectedTgUserId ? (id === selectedTgUserId ? 'active' : '') : '' }`}
           onClick={onSelect}>
        <div className="tg-name">{`${tg_nickname ? '@' : ''}`}{ tg_nickname || tg_username }</div>
      </div>
    )

  }
);

export default TgUser;