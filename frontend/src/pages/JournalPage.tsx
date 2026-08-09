// src/pages/JournalPage.tsx
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router'
import { getReadings } from '../lib/journal/journal.ts'
import { JournalCard } from '../components/journal/JournalCard.tsx'
import type { Reading } from '../types/journal'

export function JournalPage() {
    const navigate = useNavigate()
    const [readings, setReadings] = useState<Reading[]>([])

    useEffect(() => {
        setReadings(getReadings())
    }, [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100svh - 56px)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, pt: 4 }}>
                <Button variant="outlined" size="small" onClick={() => navigate('/journal/spreads')}>
                    스프레드 관리
                </Button>
            </Box>
            <Box sx={{ flex: 1, px: 4, py: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {readings.length === 0 ? (
                    <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 8 }}>
                        아직 기록된 리딩이 없습니다.
                    </Typography>
                ) : (
                    readings.map((reading) => (
                        <JournalCard
                            key={reading.id}
                            reading={reading}
                            onClick={() => navigate(`/journal/${reading.id}`)}
                        />
                    ))
                )}
            </Box>
            <Fab
                color="primary"
                aria-label="새 리딩 기록"
                sx={{ position: 'fixed', bottom: 72, right: 16 }}
                onClick={() => navigate('/journal/new')}
            >
                <AddIcon />
            </Fab>
        </Box>
    )
}