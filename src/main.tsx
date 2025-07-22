import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Development utility for performance testing
if (process.env.NODE_ENV === 'development') {
  // Add global function to clear storage (only in development)
  (window as any).clearStorageForTesting = () => {
    localStorage.clear();
    sessionStorage.clear();
    // Clear cookies
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    console.log('Storage cleared for performance testing');
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
