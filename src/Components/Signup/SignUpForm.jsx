import React, { useState } from 'react';
import { signUpWithEmailPassword } from '../../firebase';
import { Form, Input, Button, Card, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const SignUpForm = ({ onSignUp }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSignUpSubmit = async (values) => {
    try {
      setLoading(true);
      await signUpWithEmailPassword(values.email, values.password);
      onSignUp();
      message.success('Sign up successful!');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card bordered={false} style={{ maxWidth: 300, margin: 'auto', borderRadius: '8px' }}>
      <Form
        form={form}
        name="signUpForm"
        layout="vertical"
        onFinish={handleSignUpSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ backgroundColor: '#5CDB95', borderColor: '#5CDB95' }} 
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignUpForm;
