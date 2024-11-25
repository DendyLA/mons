import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './font-awesome.min.css'
import './bootstrap-grid.min.css'
import './fonts.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
