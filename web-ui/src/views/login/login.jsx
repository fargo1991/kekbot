import "./style.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import { Form, Input, Checkbox, Button } from "antd";
import { UserOutlined , LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import { login, getSuggestions } from "../../api";
import { setUserAuthorized } from "../../actions/login.js";

export default
    connect(
        state => {
            return {}
        },
        dispatch => {
            return {
                setUserAuthorized : bindActionCreators(setUserAuthorized, dispatch)
            }
        }
    )(
    props => {

      const [ redirectTo, setRedirectTo ] = useState(""),
            [ loginStatus, setLoginStatus ] = useState(-1),
            [ loading , setLoading ] = useState(false);

      const onFinish = params => {

        setLoading(true);

        login(params)
            .then(
                result => {
                    setLoading(false);
                    props.setUserAuthorized(true, result.data.token);
                    setRedirectTo("/");
                },
                error => {
                    setLoading(false);
                    console.log(error);
                    if(error.response)
                        setLoginStatus(error.response.status);
                    else
                        setLoginStatus(0);
                }
            )
    };

      // useEffect(()=>{},[redirectTo])

    const renderAlert = () => {
        switch (loginStatus) {
            case -1:
                return '';
            case 0: return <p className="error-login-response">Нет связи с сервером</p>;
            case 401: return <p className="error-login-response">Неправильный логин или пароль</p>;
            case 400: return <p className="error-login-response">Ошибка клиента. Неверный запрос</p>;
            case 500: return <p className="error-login-response">Ошибка сервера.</p>;
        }
    };

    if(redirectTo.length)
        return <Redirect to={redirectTo}/>;

      return(
        <div className="login-page">
            {/*<h1>Login</h1>*/}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <h1>Войти</h1>
                { renderAlert() }
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, укажите логин',
                        },
                    ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите пароль',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Пароль"
                        iconRender={passwordVisible => (passwordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            loading={loading}
                            size={"large"}
                            style={{ width : "100%"}}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>

        </div>
      )

})
