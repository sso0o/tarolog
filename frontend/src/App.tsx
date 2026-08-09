// src/App.tsx
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Box from '@mui/material/Box'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { DictionaryPage } from './pages/DictionaryPage'
import { FlashcardPage } from './pages/FlashcardPage'
import { QuizPage } from './pages/QuizPage'
import { MatchingPage } from './pages/MatchingPage'
import { useNativeAppSetup } from './lib/useNativeAppSetup'

const TABS = [
    { path: '/dictionary', label: '사전' },
    { path: '/flashcard', label: '학습' },
    { path: '/quiz', label: '퀴즈' },
    { path: '/matching', label: '매칭' },
] as const

function activeTab(pathname: string): string {
    const tab = TABS.find((t) => pathname.startsWith(t.path))
    return tab ? tab.path : '/dictionary'
}

export function App() {
    useNativeAppSetup()

    const location = useLocation()
    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
            <AppBar position="sticky" elevation={0}>
                <Toolbar sx={{ justifyContent: 'center', gap: 2, minHeight: '64px !important' }}>
                    <ToggleButtonGroup
                        value={activeTab(location.pathname)}
                        exclusive
                        onChange={(_, path: string | null) => {
                            if (!path) return
                            if (path === '/flashcard') { navigate('/flashcard/setup'); return }
                            if (path === '/quiz') { navigate('/quiz/setup'); return }
                            if (path === '/matching') { navigate('/matching/setup'); return }
                            navigate(path)
                        }}
                        aria-label="화면 전환"
                    >
                        {TABS.map((tab) => (
                            <ToggleButton key={tab.path} value={tab.path}>{tab.label}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<Navigate to="/dictionary" replace />} />
                <Route path="/dictionary" element={<DictionaryPage />} />
                <Route path="/flashcard/*" element={<FlashcardPage />} />
                <Route path="/quiz/*" element={<QuizPage />} />
                <Route path="/matching/*" element={<MatchingPage />} />
            </Routes>
        </Box>
    )
}

export default App