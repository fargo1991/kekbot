import "./style.css";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router-dom';

import { setTopNavigationActiveLink } from "../../actions/ui.js";
import { setPostWasEdited, setSuggestion, resetState,
         setText, cancel } from "../../actions/createPost.js";
import { getSuggestion, imageUrl, createPost } from "../../api";

import { FileImageOutlined } from "@ant-design/icons";
import { message, Button, Input } from "antd";

import noPhoto from "../../assets/nophoto.jpg";

import templates from "./templates.js";
import GoBackLink from "../../components/GoBackLink/GoBackLink.jsx";

export default connect(
    state => {
        return {
            text : state.createPost.text,
            image_id : state.createPost.suggestion.image_id,
            author : {
                nickname : state.createPost.suggestion.nickname,
                username : state.createPost.suggestion.username
            },
            suggestionText : state.createPost.suggestion.text,
            wasEdited : state.createPost.wasEdited
        }
    },
    dispatch => {
        return {
            setTopNavigationActiveLink : bindActionCreators(setTopNavigationActiveLink, dispatch),
            setPostWasEdited : bindActionCreators(setPostWasEdited, dispatch),
            setSuggestion : bindActionCreators(setSuggestion, dispatch),
            resetState : bindActionCreators(resetState, dispatch),
            setText : bindActionCreators(setText, dispatch),
            cancel : bindActionCreators(cancel, dispatch)
        }
    }
)(
    ({ text, image_id, author,
       suggestionText,
       wasEdited,
       match,
       setTopNavigationActiveLink, setPostWasEdited, setSuggestion,
       resetState, setText, cancel
     }) => {
        const { suggestionId } = match.params;

        const [ saveDisabled, setSaveDisabled ] = useState(false);
        const [ redirectTo, setRedirectTo ] = useState('');

        useEffect(() => {
            setTopNavigationActiveLink('/posts');

            getSuggestion(suggestionId)
                .then(
                    result => {
                      setSuggestion(result.data)
                    },
                    error => {
                      message.error("Не удалось загрузить информацию о предложенном посте")
                    }
                )
        },[]);

        const applyTemplate = () => {
          setText(templates[0].render({
                  text : text,
                  author : author.nickname ? author.nickname : author.username
            })
          )
        };

        const onSave = () => {

          setSaveDisabled(true);

          createPost({
              suggestionId,
              image_id,
              caption : text
          })
              .then(
                  result => {
                      setSaveDisabled(false);
                      setRedirectTo(`/post/edit/${result.data.id}`);
                      message.success('Публикация создана')
                  },
                  error => {
                      setSaveDisabled(false);
                      message.error('Произошла ошибка сервера при попытке сохранить публикацию')
                  }
              )

        };

        if(redirectTo.length)
            return <Redirect to={redirectTo}/>;

        return(
            <div className={'create-post-page'}>
                <GoBackLink to={'/posts'}>К списку постов</GoBackLink>
                <div className={'create-post'}>
                <div className={'create-post-header'}>
                    <h3>Создать пост на основе предложенного</h3>
                </div>
                <div className={'container'}>
                    <div className={'create-post-image'}
                         style={{ backgroundImage : `url(${image_id ? imageUrl(image_id) : noPhoto})`}}
                    >
                    </div>

                    <div className={'create-post-caption'}>
                        <Input.TextArea
                            value={text}
                            onChange={(e) => { setText(e.currentTarget.value)}}
                            rows={12}/>
                    </div>
                </div>

                <div className={"create-post-footer"}>
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