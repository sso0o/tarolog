// src/pages/JournalPage.tsx
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router'
import { getReadings } from '../lib/journal/journal.ts'
import { JournalCard } from '../components/journal/JournalCard.tsx'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import { EmptyState } from '../components/shared/EmptyState.tsx'
import type { Reading } from '../types/journal'

export function JournalPage() {
    const navigate = useNavigate()
    const [readings, setReadings] = useState<Reading[]>([])

    useEffect(() => {
        setReadings(getReadings())
    }, [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, px: { xs: 4, sm: 6, md: 8 }, py: { xs: 6, md: 10 } }}>
            <PageHeader
                chapter="CHAPTER 05 · JOURNAL"
                title="리딩 일지"
                description="질문과 카드 배치, 나만의 해석을 기록하세요."
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate('/journal/spreads')}>
                    스프레드 관리
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {readings.length === 0 ? (
                    <EmptyState
                        title="아직 리딩 기록이 없습니다"
                        description="첫 리딩을 기록해 나만의 타로 아카이브를 시작하세요."
                        actionLabel="새 리딩 기록"
                        onAction={() => navigate('/journal/new')}
                    />
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
            <Box
                sx={{
                    position: 'fixed',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'min(100%, 1280px)',
                    bottom: 'calc(66px + 16px + env(safe-area-inset-bottom))',
                    zIndex: 11,
                    pointerEvents: 'none',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    px: { xs: 4, sm: 6 },
                }}
            >
                <Fab
                    aria-label="새 리딩 기록"
                    onClick={() => navigate('/journal/new')}
                    sx={{
                        pointerEvents: 'auto',
                        color: 'text.primary',
                        backgroundColor: 'var(--feature-accent)',
                        border: '2px solid',
                        borderColor: 'text.primary',
                        boxShadow: 2,
                        '&:hover': { backgroundColor: 'var(--feature-accent)' },
                    }}
                >
                    <AddIcon />
                </Fab>
            </Box>
        </Box>
    )
}
