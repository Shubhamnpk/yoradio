import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorProvider } from '@/components/errors/ErrorProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);