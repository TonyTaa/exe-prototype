import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import './styles/theme.css';
import App from './App.jsx';
import { ConsultationProvider } from './context/ConsultationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConsultationProvider>
        <App />
      </ConsultationProvider>
    </BrowserRouter>
  </StrictMode>,
);
