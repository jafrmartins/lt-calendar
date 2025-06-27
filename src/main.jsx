import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SnackProvider } from './components/SnackProvider.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { CalendarProvider } from './components/CalendarProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackProvider>
      <ThemeProvider>
        <CalendarProvider>
          <App />
        </CalendarProvider>
      </ThemeProvider>
    </SnackProvider>
  </StrictMode>,
)
