import type { Component } from 'solid-js';
import Navbar from '../navbar/navbar';

const Layout: Component = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout__content">{children}</div>
    </div>
  );
};

export default Layout;
