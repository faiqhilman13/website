import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './variations/variation-themes.css';
import { AppVariationVoid } from './variations/AppVariationVoid.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppVariationVoid />
  </StrictMode>
);
