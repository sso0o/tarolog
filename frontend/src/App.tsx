// src/App.tsx
import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
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
import { useAdBannerTopClearance } from './contexts/AdBannerContext.tsx'
import { AdBannerSpacer } from './components/shared/AdBannerSpacer.tsx'

export function App() {
    const requestFocusExit = useRequestFocusExit()
    useNativeAppSetup(requestFocusExit)
    const adBannerTopClearance = useAdBannerTopClearance()

    const [showSplash, setShowSplash] = useState(true)
    const [fading, setFading] = useState(false)
    const [navHeight, setNavHeight] = useState(0)

    const location = useLocation()
    const navigate = useNavigate()
    const feature = featureFromPath(location.pathname)
    const normalizedPath = location.pathname.replace(/\/+$/, '') || '/'
    const focusMode = isFocusPath(normalizedPath)

    const handleNavHeightChange = useCallback((h: number) => {
        console.log('[AdBanner] navHeight', h)
        setNavHeight(h)
    }, [])

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFading(true), 1000)
        const hideTimer = setTimeout(() => setShowSplash(false), 1500)
        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(hideTimer)
        }
    }, [])

    useEffect(() => {
        // SPA 라우팅은 스크롤 위치를 유지하므로, 이전 화면에서 아래로 스크롤된 채로 이동하면
        // 상단 광고 스페이서가 화면 밖으로 밀려나 콘텐츠가 배너 아래로 안 밀린 것처럼 보인다.
        window.scrollTo(0, 0)
    }, [location.pathname])

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
                <AdBannerSpacer clearance={adBannerTopClearance} />
                <Box
                    sx={{
                        flex: 1,
                        // navHeight는 AppNavigation 자신의 안전영역 패딩까지 포함한 실측 높이라
                        // 여기서 안전영역을 또 더하지 않는다. 아직 측정 전(navHeight===0)이면
                        // 기존 추정치로 폴백한다.
                        pb: focusMode
                            ? 0
                            : navHeight > 0
                              ? `${navHeight}px`
                              : 'calc(66px + env(safe-area-inset-bottom))',
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
                    <AppNavigation
                        pathname={location.pathname}
                        onNavigate={(path) => navigate(path)}
                        onHeightChange={handleNavHeightChange}
                    />
                )}
            </Box>
        </>
    )
}

export default App
