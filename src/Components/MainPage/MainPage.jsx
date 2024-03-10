import React, { useState } from 'react';
import { Button, Typography, Space, Modal } from 'antd';
import LoginForm from '../Login/LoginForm';
import SignUpForm from '../Signup/SignUpForm';
import "./MainPage.css"
import { LinkedinOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;

const MainPage = ({handleOpenModal}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="animated-background" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', padding: '20px' }}>
    <Title>Welcome to  Weekly Planner!</Title>
    <Paragraph>Manage your tasks efficiently and enjoy a productivity boost.</Paragraph>
    <a href="https://www.linkedin.com/in/yiğit-özay/" target="_blank" rel="noopener noreferrer">
        <LinkedinOutlined style={{ fontSize: '30px', color: '#0e76a8' }} />
      </a>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <Button type="primary" onClick={() => handleOpenModal('login')}>Log In</Button>
         <Button onClick={() => handleOpenModal('signup')}>Sign Up</Button>
    </div>
    <Modal
      title={modalContent === 'login' ? 'Log In' : 'Sign Up'}
      visible={isModalOpen}
      onCancel={handleClose}
      footer={null}
    >
      {modalContent === 'login' ? <LoginForm onSignIn={handleClose} /> : <SignUpForm onSignUp={handleClose} />}
    </Modal>
  </div>
  );
};

export default MainPage;
