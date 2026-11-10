import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PartnerApp } from './PartnerApp';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PartnerApp />
  </StrictMode>
);
