import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Pages from './pages';
import Preloader from './Preloader';
import EventsListener from './EventsListener';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<BrowserRouter>
  <Preloader><Pages /></Preloader>
  <EventsListener />
  <Toaster position='top-center' />
</BrowserRouter>);