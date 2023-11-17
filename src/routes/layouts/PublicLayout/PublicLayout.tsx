import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';

const PublicLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div>
      <Header />
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
