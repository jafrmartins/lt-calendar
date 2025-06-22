import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SnackProvider } from './components/SnackProvider.jsx'
import { ThemeProvider } from "@material-tailwind/react";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SnackProvider>
  </StrictMode>,
)
