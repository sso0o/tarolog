// src/App.tsx
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import StyleIcon from '@mui/icons-material/Style'
import QuizIcon from '@mui/icons-material/Quiz'
import ExtensionIcon from '@mui/icons-material/Extension'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { DictionaryPage } from './pages/DictionaryPage'
import { FlashcardPage } from './pages/FlashcardPage'
import { QuizPage } from './pages/QuizPage'
import { MatchingPage } from './pages/MatchingPage'
import { useNativeAppSetup } from './hooks/useNativeAppSetup.ts'
import { JournalPage } from './pages/JournalPage'
import { JournalDetailPage } from './pages/JournalDetailPage'
import { SpreadManagePage } from './pages/SpreadManagePage'

const TABS = [
    { path: '/dictionary', label: '사전', icon: <MenuBookIcon /> },
    { path: '/flashcard', label: '학습', icon: <StyleIcon /> },
    { path: '/quiz', label: '퀴즈', icon: <QuizIcon /> },
    { path: '/matching', label: '매칭', icon: <ExtensionIcon /> },
    { path: '/journal', label: '일지', icon: <AutoStoriesIcon /> },
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
            <Box sx={{ flex: 1, pb: '56px' }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/dictionary" replace />} />
                    <Route path="/dictionary" element={<DictionaryPage />} />
                    <Route path="/flashcard/*" element={<FlashcardPage />} />
                    <Route path="/quiz/*" element={<QuizPage />} />
                    <Route path="/matching/*" element={<MatchingPage />} />
                    <Route path="/journal" element={<JournalPage />} />                    
                    <Route path="/journal/:id" element={<JournalDetailPage />} />
                    <Route path="/journal/spreads" element={<SpreadManagePage />} />
                    <Route path="/journal/*" element={<div style={{ padding: 16 }}>준비중</div>} />
                </Routes>
            </Box>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    value={activeTab(location.pathname)}
                    onChange={(_, path: string) => {
                        if (path === '/flashcard') { navigate('/flashcard/setup'); return }
                        if (path === '/quiz') { navigate('/quiz/setup'); return }
                        if (path === '/matching') { navigate('/matching/setup'); return }
                        navigate(path)
                    }}
                    showLabels
                >
                    {TABS.map((tab) => (
                        <BottomNavigationAction
                            key={tab.path}
                            value={tab.path}
                            label={tab.label}
                            icon={tab.icon}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default App