import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GlobalStateProvider } from './Context/GlobalStateContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStateProvider>
    <App />
    </GlobalStateProvider>
  </React.StrictMode>,
)
