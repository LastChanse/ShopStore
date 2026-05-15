import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) { navigate('/'); return null; }

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) { setError('Заполните все поля'); return; }
    if (!email.includes('@')) { setError('Некорректный email'); return; }
    login({ name, email });
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <Title level={3} className="text-center mb-6">Войти в аккаунт</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Имя" required>
            <Input size="large" value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input size="large" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
          </Form.Item>
          {error && <Alert message={error} type="error" showIcon className="mb-4" />}
          <Button type="primary" htmlType="submit" block size="large" className="bg-[#FF385C] border-[#FF385C] h-12 font-medium mt-2">Войти</Button>
        </Form>
        <Text type="secondary" className="block text-center mt-4 text-xs">* Достаточно указать имя и email</Text>
      </div>
    </div>
  );
}