import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

import { Menu, Dropdown, message } from "antd";
import { StarOutlined, FileDoneOutlined, DeleteOutlined} from "@ant-design/icons";

import { deleteSuggestion } from '../../api';

import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";

export default ({ suggestionId, onAction }) => {

    const [ redirectTo, setRedirectTo ] = useState('');
    const [ confirmDeleteVisible, setConfirmDeleteVisible ] = useState(false);
    const [ deleteLoading, setDeleteLoading ] = useState(false);

    const onMenuClick = e => {
        let { key } = e;

        switch (key) {
            case 'public' :
                setRedirectTo(`/posts/create/${suggestionId}`);
                break;
            case 'defer' :
                break;
            case 'remove' :
                setConfirmDeleteVisible(true);
                break;
        }
    };

    const handleDeleteSuggestion = () => {

        setDeleteLoading(true);

        deleteSuggestion(suggestionId)
            .then(
                result => {
                    message.success('Предложенный пост удален');
                    setConfirmDeleteVisible(false);
                    setDeleteLoading(false);
                    onAction();
                },
                error => {
                    message.error('Произошла ошибка при попытке удалить предложенный пост');
                    setConfirmDeleteVisible(false);
                    setDeleteLoading(false);
                }
            );

    };

    if(redirectTo.length)
        return <Redirect to={redirectTo}/>;

    return (
        <div className={"suggestion-actions-dropdown"}>
            <ConfirmDeleteModal
                visible={confirmDeleteVisible}
                onOk={handleDeleteSuggestion}
                onCancel={() => { setConfirmDeleteVisible(false)}}
                deleteLoading={deleteLoading}
            />
            <Dropdown.Button overlay={
                                 <Menu onClick={onMenuClick}>
                                     <Menu.Item key="public" icon={<FileDoneOutlined/>}>
                                         Перенести в публикации
                                     </Menu.Item>
                                     <Menu.Item key="defer" icon={<StarOutlined/>} disabled>
                                         Отложить
                                     </Menu.Item>
                                     <Menu.Item key="remove" icon={<DeleteOutlined/>}>
                                         Удалить
                                     </Menu.Item>
                                 </Menu>
                             }>
                Действия
            </Dropdown.Button>
        </div>
    )
}