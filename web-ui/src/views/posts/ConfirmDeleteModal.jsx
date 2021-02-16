import React from 'react';
import { Modal, Button } from 'antd';

const ConfirmDeleteModal = ({ visible, onOk, onCancel,
                              deleteLoading }) => {

    return(
        <Modal
            key={visible}
            width={270}
            visible={visible}
            onCancel={onCancel}
            title={''}
            footer={<div>
                <Button size={'small'} type={'primary'} onClick={onOk} loading={deleteLoading}>Да</Button>
                <Button size={'small'} onClick={onCancel}>Нет</Button>
            </div>}
        >
            Удалить пост из публикаций?
        </Modal>);

};

export default ConfirmDeleteModal;