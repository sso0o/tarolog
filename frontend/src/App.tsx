// src/App.tsx
import { useState, useEffect } from 'react'
import { SplashScreen } from './components/shared/SplashScreen'
import { AppNavigation } from './components/shared/AppNavigation.tsx'
import Box from '@mui/material/Box'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { DictionaryPage } from './pages/DictionaryPage'
import { FlashcardPage } from './pages/FlashcardPage'
import { QuizPage } from './pages/QuizPage'
import { MatchingPage } from './pages/MatchingPage'
import { useNativeAppSetup } from './hooks/useNativeAppSetup.ts'
import { JournalPage } from './pages/JournalPage'
import { JournalDetailPage } from './pages/JournalDetailPage'
import { SpreadManagePage } from './pages/SpreadManagePage'
import { JournalNewPage } from './pages/JournalNewPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { featureAccents, featureFromPath, isFocusPath } from './design/system.ts'

export function App() {
    useNativeAppSetup()

    const [showSplash, setShowSplash] = useState(true)
    const [fading, setFading] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    const feature = featureFromPath(location.pathname)
    const normalizedPath = location.pathname.replace(/\/+$/, '') || '/'
    const focusMode = isFocusPath(normalizedPath)

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFading(true), 1000)
        const hideTimer = setTimeout(() => setShowSplash(false), 1500)
        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(hideTimer)
        }
    }, [])

    return (
        <>
            {showSplash && <SplashScreen fading={fading} />}
            <Box
                data-testid="app-shell"
                data-feature={feature}
                sx={{
                    '--feature-accent': featureAccents[feature],
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100svh',
                }}
            >
                <Box sx={{ flex: 1, pb: focusMode ? 0 : 'calc(66px + env(safe-area-inset-bottom))' }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dictionary" replace />} />
                        <Route path="/dictionary" element={<DictionaryPage />} />
                        <Route path="/flashcard/*" element={<FlashcardPage />} />
                        <Route path="/quiz/*" element={<QuizPage />} />
                        <Route path="/matching/*" element={<MatchingPage />} />
                        <Route path="/journal" element={<JournalPage />} />                    
                        <Route path="/journal/:id" element={<JournalDetailPage />} />
                        <Route path="/journal/spreads" element={<SpreadManagePage />} />
                        <Route path="/journal/new" element={<JournalNewPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                    </Routes>
                </Box>
                {!focusMode && (
                    <AppNavigation pathname={location.pathname} onNavigate={(path) => navigate(path)} />
                )}
            </Box>
        </>
    )
}

export default App
