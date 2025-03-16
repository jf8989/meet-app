// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as atatus from 'atatus-spa';
import './index.css'
import App from './App.jsx'

atatus.config('def1f4f1ee724c8eb816e585d69b5940').install();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
