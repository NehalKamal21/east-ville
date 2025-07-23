import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Register service worker for better caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

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

  // Add performance monitoring utilities
  import('./utils/performanceMonitor').then(({ performanceMonitor }) => {
    (window as any).performanceMonitor = performanceMonitor;
    (window as any).showPerformanceReport = () => {
      performanceMonitor.logPerformanceReport();
    };
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
