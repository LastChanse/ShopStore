import { useState } from 'react';
import { Modal, Input, Button, Typography } from 'antd';
import { useAuth } from '../contexts/AuthContext.tsx';

const { Text } = Typography;

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phone, setPhone] = useState('+7 ');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+7')) val = '+7 ';
    setPhone(val);
  };

  const handleSubmit = () => {
    const digits = phone.replace(/\D/g, '');
    if (!name.trim()) { setError('Введите имя'); return; }
    if (digits.length < 11) { setError('Введите корректный номер телефона'); return; }
    setError('');
    login({ name: name.trim(), email: `${digits}@phone.local` });
    setPhone('+7 ');
    setName('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={null}
      centered
      width={380}
      styles={{
        content: { borderRadius: 16, padding: '36px 40px' },
        mask: { backdropFilter: 'blur(2px)' },
      }}
      closeIcon={<span style={{ fontSize: 18, color: '#aaa', lineHeight: 1 }}>x</span>}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', margin: 0 }}>Вход</h2>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 8 }}>Имя</label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ваше имя"
          size="large"
          style={{ borderRadius: 8, borderColor: '#FF6B2B', borderWidth: 1.5, fontSize: 16, height: 52, color: '#1A1A1A' }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 8 }}>Телефон</label>
        <Input
          value={phone}
          onChange={handlePhoneChange}
          size="large"
          style={{ borderRadius: 8, borderColor: '#FF6B2B', borderWidth: 1.5, fontSize: 16, height: 52, color: '#1A1A1A' }}
          onFocus={e => { const len = e.target.value.length; e.target.setSelectionRange(len, len); }}
        />
      </div>

      {error && (
        <Text type="danger" style={{ fontSize: 12, marginBottom: 12, display: 'block' }}>{error}</Text>
      )}

      <Button
        onClick={handleSubmit}
        block
        size="large"
        style={{
          background: '#FFB899',
          borderColor: '#FFB899',
          color: '#FF6B2B',
          borderRadius: 8,
          height: 52,
          fontSize: 17,
          fontWeight: 700,
          boxShadow: 'none',
        }}
      >
        Вход
      </Button>
    </Modal>
  );
}