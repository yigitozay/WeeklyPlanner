import React, { useState } from 'react';
import { signInWithEmailPassword, signInWithGoogle } from '../../firebase';
import { Form, Input, Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

const LoginForm = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async () => {
    try {
      await signInWithEmailPassword(email, password);
      onSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onFinish={handleLoginSubmit} layout="vertical">
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Log In
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="default" onClick={handleGoogleSignIn} block icon={<GoogleOutlined />}>
          Sign in with Google
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
