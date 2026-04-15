import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MobileApp from './MobileApp.jsx'

const isMobile = new URLSearchParams(window.location.search).get('mobile') === '1';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMobile ? <MobileApp /> : <App />}
  </StrictMode>,
)
