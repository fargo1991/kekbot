import React, { useState, useEffect } from "react";

import { Button, Form, Input, message } from "antd";
import SunEditor, { buttonList } from "suneditor-react";

import { postNote } from "../../api";
import { Redirect } from "react-router-dom";

export default props => {

    const [ title, setTitle ] = useState(''),
        [ note, setNote ] = useState(''),
        [ redirect, setRedirect ] = useState('')

    const handleOk = params => {

        if(!title.length || !note.length){
            message.error('Необходимо заполнить все поля');
            return;
        }

        postNote({
            title, content : note
        })
            .then(
                result => {
                    console.log(result.data)
                    setRedirect("/notes");
                },
                error => {
                    console.log(error);
                    message.error("Произошла ошибка при отправке запроса")
                }
            )

    }

    if(redirect.length)
        return <Redirect to={redirect}/>


    return(
        <div className={"create-note"}>

            <h1>Создать заметку</h1>

            <Form>
                <Form.Item
                    label={"Заголовок"}
                >
                    <Input value={title} onChange={ ev => { setTitle(ev.currentTarget.value) }}/>
                </Form.Item>
            </Form>


            <SunEditor
                lang={"ru"}
                setContents={note}
                onChange={ content =>  {
                    setNote(content)
                }}
                setOptions={{
                    height : 200,
                    buttonList : buttonList.complex
                }}
            />

            <Button onClick={handleOk}>Сохранить</Button>
        </div>
    )

}