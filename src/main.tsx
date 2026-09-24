import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { initAnalytics } from './analytics.ts';
import './index.css';

initAnalytics();

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds ship the markup pre-rendered (see vite.config.ts); dev mounts fresh.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
