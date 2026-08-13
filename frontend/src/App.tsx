// src/App.tsx
import { useState, useEffect, lazy, Suspense } from 'react'
import { SplashScreen } from './components/shared/SplashScreen'
import { AppNavigation } from './components/shared/AppNavigation.tsx'
import Box from '@mui/material/Box'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { DictionaryPage } from './pages/DictionaryPage'
import { useNativeAppSetup } from './hooks/useNativeAppSetup.ts'

// 첫 화면인 사전만 즉시 로드하고 나머지는 분리한다. 특히 일지 작성은
// @mui/x-date-pickers + dayjs를 끌고 오는데 다른 화면은 쓰지 않는다.
const FlashcardPage = lazy(() => import('./pages/FlashcardPage').then((m) => ({ default: m.FlashcardPage })))
const QuizPage = lazy(() => import('./pages/QuizPage').then((m) => ({ default: m.QuizPage })))
const MatchingPage = lazy(() => import('./pages/MatchingPage').then((m) => ({ default: m.MatchingPage })))
const JournalPage = lazy(() => import('./pages/JournalPage').then((m) => ({ default: m.JournalPage })))
const JournalDetailPage = lazy(() => import('./pages/JournalDetailPage').then((m) => ({ default: m.JournalDetailPage })))
const SpreadManagePage = lazy(() => import('./pages/SpreadManagePage').then((m) => ({ default: m.SpreadManagePage })))
const JournalNewPage = lazy(() => import('./pages/JournalNewPage').then((m) => ({ default: m.JournalNewPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
import { featureAccents, featureFromPath, isFocusPath } from './design/system.ts'
import {useRequestFocusExit} from "./contexts/FocusExitContext.tsx";
import { useAdmobBanner } from './hooks/useAdmobBanner.ts'
import { AdBannerSpacer } from './components/shared/AdBannerSpacer.tsx'

export function App() {
    const requestFocusExit = useRequestFocusExit()
    useNativeAppSetup(requestFocusExit)
    useAdmobBanner()

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
                <AdBannerSpacer />
                <Box
                    sx={{
                        flex: 1,
                        pb: focusMode ? 0 : 'calc(66px + env(safe-area-inset-bottom))',
                    }}
                >
                    <Suspense fallback={null}>
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
                    </Suspense>
                </Box>
                {!focusMode && (
                    <AppNavigation pathname={location.pathname} onNavigate={(path) => navigate(path)} />
                )}
            </Box>
        </>
    )
}

export default App
