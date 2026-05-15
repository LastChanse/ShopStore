import { useState } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const { Text } = Typography;

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) { setError('Заполните все поля'); return; }
    if (!email.includes('@')) { setError('Некорректный email'); return; }
    login({ name, email });
    setName(''); setEmail(''); setError('');
    onClose();
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Вход" centered width={360}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Имя" required>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
        </Form.Item>
        {error && <Text type="danger" className="block mb-2">{error}</Text>}
        <Button type="primary" htmlType="submit" block className="bg-[#FF385C] border-[#FF385C]">Войти</Button>
        <Text type="secondary" className="block text-center mt-2 text-xs">* Имя и email без проверки</Text>
      </Form>
    </Modal>
  );
}