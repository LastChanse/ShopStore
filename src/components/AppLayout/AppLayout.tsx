import type { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const { Content } = Layout;

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className="min-h-screen bg-[#f7f7f7]" style={{ background: '#f7f7f7' }}>
      <Header />
      <Content className="max-w-[1200px] mx-auto w-full px-4 py-6 flex-1">
        {children}
      </Content>
      <Footer />
    </Layout>
  );
}