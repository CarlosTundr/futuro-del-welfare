import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Ordine import stili: token -> reset -> global (fonte unica di verita del kit)
import './kit/styles/tokens.css'
import './kit/styles/reset.css'
import './kit/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
