import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Agentation } from 'agentation';
import { InterfaceKit } from 'interface-kit/react';

import { App } from '@/app/App';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      {import.meta.env.DEV ? (
        <>
          <InterfaceKit />
          <Agentation />
        </>
      ) : null}
    </ThemeProvider>
  </StrictMode>,
);
