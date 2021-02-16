import "./style.css";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setTopNavigationActiveLink } from "../../actions/ui.js";
import { setPostWasEdited, setPost, resetState,
    setText, cancel } from "../../actions/editPost.js";

import { getPost, imageUrl, savePost } from "../../api";

import { FileImageOutlined } from "@ant-design/icons";
import { message, Button, Input } from "antd";

import noPhoto from "../../assets/nophoto.jpg";
import GoBackLink from "../../components/GoBackLink/GoBackLink.jsx";

import templates from "./templates.js";

export default connect(
    state => {
        return {
            post : state.editPost.post,
            text : state.editPost.text,
            author : state.editPost.post.author,
            wasEdited : state.editPost.wasEdited
        }
    },
    dispatch => {
        return {
            setTopNavigationActiveLink : bindActionCreators(setTopNavigationActiveLink, dispatch),
            resetState : bindActionCreators(resetState, dispatch),
            setText : bindActionCreators(setText, dispatch),
            cancel : bindActionCreators(cancel, dispatch),
            setPost : bindActionCreators(setPost, dispatch)
        }
    }
)(
    ({  post, text, author,
        wasEdited,
        match,
        setPost, setText, cancel
     }) => {
        const { postId } = match.params;

        const [ saveDisabled, setSaveDisabled ] = useState(false);

        useEffect(() => {
            setTopNavigationActiveLink('/posts');

            getPost(postId)
                .then(
                    result => {
                        setPost(result.data)
                    },
                    error => {
                        message.error("Не удалось загрузить информацию о посте")
                    }
                );

            return resetState;
        },[]);

        const { image_id } = post;
        const applyTemplate = () => {

            setText(templates[0].render({
                    text : text,
                    author : author.nickname ? author.nickname : author.username
                })
            )
        };

        const onSave = () => {

            savePost({
                ...post,
                caption : text
            })
                .then(
                    result => {
                        console.log(result);
                        message.success('Изменения сохранены')
                    },
                    error => {
                        message.error('Не удалось сохранить пост. Ошибка сервера.')
                    }
                )
        };

        return(
            <div className={'edit-post-page'}>
                <GoBackLink to={'/posts'}>К списку постов</GoBackLink>
                <div className={'edit-post'}>
                <div className={'edit-post-header'}>
                    <h3>Редактировать пост на основе предложенного</h3>
                </div>
                <div className={'container'}>
                    <div className={'edit-post-image'}
                         style={{ backgroundImage : `url(${image_id ? imageUrl(image_id) : noPhoto})`}}
                    >
                    </div>

                    <div className={'edit-post-caption'}>
                        <Input.TextArea
                            value={text}
                            onChange={(e) => { setText(e.currentTarget.value)}}
                            rows={12}/>
                    </div>
                </div>

                <div className={"edit-post-footer"}>
                    <Button style={{ float : 'left', marginLeft : 0 }}
                            onClick={applyTemplate}
                            size={'large'}
                    >
                        Применить шаблон
                    </Button>
                    <Button size={"large"}
                            type={"primary"}
                            onClick={onSave}
                            disabled={saveDisabled}
                            loading={saveDisabled}
                    >
                        Сохранить
                    </Button>
                    <Button size={"large"}
                            disabled={!wasEdited}
                            onClick={cancel}
                    >Отмена</Button>
                </div>
            </div>
            </div>
        )

    }
)