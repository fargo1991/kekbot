import "./style.css";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { NavLink } from "react-router-dom";

export default
    connect(
        state => {
            return {
                activeLink : state.ui.activeLink
            }
        },
        dispatch => {
            return {}
        }
    )(
        props => {
            const { activeLink } = props;

            const links = [
                { link : "/suggestions", text : "Предложка постов", disabled : false },
                { link : "/posts", text : "Публикации", disabled : false },
                { link : "/chats", text : "Чаты", disabled : false },
                { link : "/notes", text : "Заметки", disabled : true} ,
                { link : "/settings", text : "Настройки", disabled : false}
            ];

            let isActive = link => link.link == activeLink ;

            return(
                <div className="header">
                    <div className={'nav-container'}>
                        {
                            links.map(
                                link => <NavLink to={link.link}
                                                 key={link.link}
                                                 // style={{ float : link.link === "/login" ? 'right' : 'left' }}
                                                 activeClassName={"activeNavLink"}
                                                 isActive={ () => isActive(link) }
                                                 disabled={link.disabled}
                                                 className={ link.disabled ? 'disabled-link' : ''}
                                        >
                                            {link.text}
                                        </NavLink>
                            )
                        }
                    </div>
                    <NavLink to={'/login'}
                             key={'login'}
                             className={'login-link'}
                    >
                        Логин
                    </NavLink>
                </div>
            );

        }
    )
