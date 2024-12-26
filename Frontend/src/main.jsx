import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './Context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
// import { Buffer } from 'buffer';
// if (!window.Buffer) {
//   window.Buffer = Buffer;
// }
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
