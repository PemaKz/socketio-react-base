import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_SOCKET_URL || undefined;

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if(!token) return null;
  return token;
}

const loadLanguage = () => {
  const lang = localStorage.getItem('lang');
  if(!lang) localStorage.setItem('lang', 'en');
  return lang || 'en';
}

export const socket = io(URL, {
  autoConnect: true,
  query: {
    authToken: getAuthToken(),
    lang: loadLanguage()
  },
});