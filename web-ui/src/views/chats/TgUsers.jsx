import React, { useEffect, useState } from  'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import TgUser from "./TgUser.jsx";
import { Spin, Empty } from "antd";

const TgUsers = connect(
  state => {
    return {
      tgUsers : state.chats.tgUsers,
      tgUsersLoading : state.chats.tgUsersLoading,
    }
  },
  dispatch => {
    return{

    }
  }
)(
  ({ tgUsers, tgUsersLoading, selectedTgUserId }) => {

    console.log(tgUsersLoading);

    return(
      <Spin spinning={tgUsersLoading}>
        <div className="tg-users-sidebar">
          {
            tgUsers.length ?
              tgUsers.map(
                tgUser => <TgUser {...tgUser} />
              ): <Empty style={{marginTop : 20}} description={'Нет пользователей'}/>
          }
        </div>
      </Spin>
    )

  }
);

export default TgUsers;