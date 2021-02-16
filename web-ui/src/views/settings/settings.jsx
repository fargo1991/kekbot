import "./style.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { message, Form, Input } from "antd";

import { getSettings } from "../../api";
import { setTopNavigationActiveLink } from "../../actions/ui.js";

export default connect(
    state => {
        return {}
    },
    dispatch => {
        return {
            setTopNavigationActiveLink : bindActionCreators(setTopNavigationActiveLink, dispatch)
        }
    }
)(
    props => {

        const [ settings, setSettings ] = useState({
            channel : "asd",
            bot : {
                username : ""
            }
        });

        useEffect(
            () => {
                getSettings()
                    .then(
                        result => {
                            setSettings(result.data)
                        },
                        error => { message.error("Произошла ошибка при загрузке страницы настроек.") }
                    );

                props.setTopNavigationActiveLink("/settings");
            }, []
        );

        return(
            <div className={"settings"}>

                <Form>

                    <h2>Настройки</h2>
                    <hr/>

                    <Form.Item
                        label={"Паблик"}
                    >
                        <Input defaultValue={`${settings.channel}`} key={settings.channel}/>
                    </Form.Item>

                    <Form.Item
                        label={"Бот"}
                    >
                        <Input defaultValue={`@${settings.bot.username}`} key={settings.bot.username}/>
                    </Form.Item>
                    <div className={"settings-bot-description"}>
                        <p>
                            <label>Название бота:</label>
                            <span>{ settings.bot.first_name}</span>
                        </p>
                    </div>

                </Form>

            </div>
        )

})