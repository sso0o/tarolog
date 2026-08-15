import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { HashRouter } from 'react-router'
import { Capacitor } from '@capacitor/core'
import { theme } from './theme'
import './index.css'
import App from './App.tsx'
import {FocusExitProvider} from "./contexts/FocusExitContext.tsx";
import { ErrorBoundary } from './components/shared/ErrorBoundary.tsx'

if ('serviceWorker' in navigator && !Capacitor.isNativePlatform()) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
    })
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
                <HashRouter>
                    <FocusExitProvider>
                        <App />
                    </FocusExitProvider>
                </HashRouter>
            </ErrorBoundary>
        </ThemeProvider>
    </StrictMode>,
)