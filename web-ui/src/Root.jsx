import "./style.css";
import "antd/dist/antd.min.css";
import "./override.css";

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./views/login/login.jsx";
import Dashboard from "./views/Dashboard.jsx";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/root.js";

import { ConfigProvider } from "antd";
import ruRU from 'antd/lib/locale/ru_RU';
import moment from "moment";

moment.locale('ru')

export default class Root extends React.Component{

  render(){

    return(
      <Provider store={createStore(rootReducer)}>
        <ConfigProvider locale={ruRU}>
          <div className="root">

            <BrowserRouter>
              <Switch>
                <Route component={Login} path="/login"/>
                <Route component={Dashboard} path="/"/>
              </Switch>
            </BrowserRouter>

          </div>
        </ConfigProvider>
      </Provider>)

  }

}
