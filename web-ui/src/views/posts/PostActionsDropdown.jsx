import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

import { Menu, Dropdown, message } from "antd";
import { StarOutlined, SendOutlined, DeleteOutlined,
         EditOutlined } from "@ant-design/icons";
import { publicPost, deletePost } from "../../api";

import ConfirmPublicPostModal from "./ConfirmPublicPostModal.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";

export default ({ postId, onAction }) => {

    const [ redirectTo, setRedirectTo ] = useState(''),
          [ confirmPublicModalVisible, setConfirmPublicModalVisible ] = useState(false),
          [ confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false),
          [ deleteLoading, setDeleteLoading] = useState(false),
          [ publicLoading, setPublicLoading ] = useState(false);

    const onMenuClick = e => {
        let { key } = e;

        switch (key) {
            case 'public' :
                setConfirmPublicModalVisible(true);
                break;
            case 'edit' :
                setRedirectTo(`/post/edit/${postId}`);
                break;
            case 'defer' :
                break;
            case 'remove' :
                setConfirmDeleteModalVisible(true);
                break;
        }
    };

    const handlePublic = () => {
        setPublicLoading(true);

        publicPost(postId)
            .then(
                result => {
                    message.success('Пост опубликован');
                    setConfirmPublicModalVisible(false);
                    onAction();
                    setPublicLoading(false);
                },
                error => {
                    message.error('Произошла ошибка при публикации поста');
                    setConfirmPublicModalVisible(false);
                    setPublicLoading(false);
                }
            )
    };

    const handleDelete = () => {
        setDeleteLoading(true);

        deletePost(postId)
            .then(
                result => {
                    message.success('Пост удален из публикаций');
                    onAction();
                    setConfirmDeleteModalVisible(false);
                    setDeleteLoading(false);
                },
                error => {
                    message.error('Произошла ошибка при попытке удалить пост из пубдикаций');
                    setConfirmDeleteModalVisible(false);
                    setDeleteLoading(false);
                }
            )
    };

    if(redirectTo.length)
        return <Redirect to={redirectTo}/>;

    return (
        <div className={"post-actions-dropdown"}>
            <ConfirmPublicPostModal
                visible={confirmPublicModalVisible}
                publicLoading={publicLoading}
                onOk={ handlePublic }
                onCancel={ () => { setConfirmPublicModalVisible(false) }}
            />
            <ConfirmDeleteModal
                visible={confirmDeleteModalVisible}
                onOk={ handleDelete }
                onCancel={ () => { setConfirmDeleteModalVisible(false) }}
                deleteLoading={deleteLoading}
            />
            <Dropdown.Button overlay={
                <Menu onClick={onMenuClick}>
                    <Menu.Item key="public" icon={<SendOutlined/>}>
                        Опубликовать
                    </Menu.Item>
                    <Menu.Item key="edit" icon={<EditOutlined/>}>
                        Редактировать
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