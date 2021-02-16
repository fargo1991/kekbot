import React from 'react';
import { Modal, Button, Spin } from 'antd';

const ConfirmPublicPostModal = ({ visible, onOk, onCancel,
                                  publicLoading }) => {

  return(
    <Modal
      key={visible}
      width={230}
      visible={visible}
      onCancel={onCancel}
      title={''}
      footer={<div>
          <Button size={'small'} type={'primary'} onClick={onOk} loading={publicLoading}>Да</Button>
          <Button size={'small'} onClick={onCancel} disabled={publicLoading}>Нет</Button>
      </div>}
  >
        <Spin spinning={publicLoading}>
            Опубликовать пост?
        </Spin>
    </Modal>);

};

export default ConfirmPublicPostModal;