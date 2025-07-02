import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Debug: vérifier les variables d'environnement
console.log('Environment variables check:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '***' + import.meta.env.VITE_FIREBASE_API_KEY.slice(-4) : 'undefined',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
