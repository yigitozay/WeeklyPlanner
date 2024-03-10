import React, { useEffect, useState } from 'react';
import Modal from './Components/Modal/modal';
import LoginForm from './Components/Login/LoginForm';
import SignUpForm from './Components/Signup/SignUpForm';
import WeekView from './Components/Week/Week';
import { Button, Row, Col } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import MainPage from './Components/MainPage/MainPage';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState('login'); 

  const handleOpenModal = (formType) => {
    setActiveForm(formType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);
  const handleSignIn = () => {
    setIsAuthenticated(true);
    handleCloseModal();
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        isAuthenticated ? <Navigate replace to="/week-view" /> : 
        <MainPage handleOpenModal={handleOpenModal} />
      } />
      <Route path="/week-view" element={isAuthenticated ? <WeekView onSignOut={handleSignOut} /> : <Navigate replace to="/" />} />
    </Routes>

    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={activeForm}>
      {activeForm === 'login' ? (
        <LoginForm onSignIn={handleSignIn} />
      ) : (
        <SignUpForm onSignUp={handleSignIn} />
      )}
    </Modal>
  </BrowserRouter>
  );
};

export default App;
