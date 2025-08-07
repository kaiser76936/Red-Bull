import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Navbar />
    <div style={{ paddingTop: '60px' }}> <AppRouter /> </div>
  </>
);
    