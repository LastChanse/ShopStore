import type { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

const { Content } = Layout;

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh', background: '#F5F0E8' }}>
      <Header />
      <Content style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '24px 16px', flex: 1 }}>
        {children}
      </Content>
      <Footer />
    </Layout>
  );
}