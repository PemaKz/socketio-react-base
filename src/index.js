import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context';
import { Toaster } from 'react-hot-toast';
import Pages from './pages';
import Preloader from './Preloader';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<BrowserRouter>
  <GlobalProvider>
    <Preloader >
      <Pages />
    </Preloader>
    <Toaster position='top-center' />
  </GlobalProvider>
</BrowserRouter>);