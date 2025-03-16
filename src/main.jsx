// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as atatus from 'atatus-spa';
import './index.css'
import App from './App.jsx'

atatus.config(import.meta.env.VITE_ATATUS_API_KEY).install();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
