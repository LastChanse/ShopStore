import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #EDE8DF', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🐧</span>
            <span style={{ color: '#FF6B2B', fontWeight: 800, fontSize: 16 }}>СЕВЕРЯНОЧКА</span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>8 800 777 33 33</div>
          <div style={{ fontSize: 12, color: '#aaa' }}>© 2025 Магазин «Северяночка». Все права защищены.</div>
        </div>
      </div>
    </footer>
  );
}