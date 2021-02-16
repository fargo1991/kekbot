import "./style.css";
import React, { useState, useEffect } from "react";
import  { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Row, Button, Form, Input, message, Tag } from "antd";

import { getNotes } from "../../api";
import { setTopNavigationActiveLink } from "../../actions/ui.js";

import "suneditor/dist/css/suneditor.min.css";

export default connect(
        state => {
            return {}
        },
        dispatch => {
            return {
                setTopNavigationActiveLink : bindActionCreators(setTopNavigationActiveLink, dispatch)
            }
        }
) (
    props => {

        const [ notes, setNotes ] = useState([]);

        useEffect( () => {

            getNotes()
                .then(
                    result => {
                        setNotes(result.data)
                    }
                );

            props.setTopNavigationActiveLink("/notes");
        }, []);


        return (
            <div className={"notes"}>
                <div className={"notes-sidebar"}>
                    <Button href={"/notes/create"} type={'primary'}> Создать заметку </Button>

                    <div className={"notes-tags"}>
                        <Tag>#Недавние</Tag>
                        <Tag>#Избранное</Tag>
                        <Tag>#Удаленные</Tag>
                    </div>
                </div>

                <div className={"notes-list"}>
                    {
                        notes.map(
                            note => {

                                return(
                                    <div className={"note"}>
                                        <div className={"note-title"}>{note.title}</div>
                                        <div className={"note-content"} dangerouslySetInnerHTML={{ __html : note.content}}></div>
                                    </div>
                                )

                            }
                        )
                    }
                </div>


            </div>
        )
})