import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './proto/App.example';
import './proto/styles/globals.css';
//import { App } from './App.tsx';
//import './styles/styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
