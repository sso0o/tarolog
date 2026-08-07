import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Box from '@mui/material/Box'
import { DictionaryPage } from './pages/DictionaryPage'
import { FlashcardPage } from './pages/FlashcardPage'

type View = 'dictionary' | 'flashcard'

export function App() {
    const [view, setView] = useState<View>('dictionary')

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
            <AppBar position="sticky" elevation={0}>
                <Toolbar sx={{ justifyContent: 'center', gap: 2, minHeight: '64px !important' }}>
                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={(_, newView: View | null) => { if (newView) setView(newView) }}
                        aria-label="화면 전환"
                    >
                        <ToggleButton value="dictionary">사전</ToggleButton>
                        <ToggleButton value="flashcard">학습</ToggleButton>
                    </ToggleButtonGroup>
                </Toolbar>
            </AppBar>
            {view === 'dictionary' ? <DictionaryPage /> : <FlashcardPage />}
        </Box>
    )
}

export default App