import React from 'react';
import { Modal, Button } from 'antd';

const ConfirmDeleteModal = ({ visible, onOk, onCancel,
                              deleteLoading }) => {

    return(
        <Modal
            key={visible}
            width={230}
            visible={visible}
            onCancel={onCancel}
            title={''}
            footer={<div>
                <Button size={'small'} type={'primary'} onClick={onOk} loading={deleteLoading}>Да</Button>
                <Button size={'small'} onClick={onCancel}>Нет</Button>
            </div>}
        >
            Удалить предложенный пост?
        </Modal>);

};

export default ConfirmDeleteModal;