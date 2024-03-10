import React from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const CustomModal = ({ isOpen, onClose, children, title }) => {
  const modalHeader = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>{title}</div>
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={onClose}
        style={{ border: 'none', padding: 0 }}
      />
    </div>
  );

  return (
    <Modal
    title={modalHeader}
    visible={isOpen} 
    onCancel={onClose} 
    footer={null}
    closable={false}
    centered
    width="90%"
    style={{ maxWidth: '500px' }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
