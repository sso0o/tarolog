// src/components/MatchingResult.tsx
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { formatDuration } from '../../lib/matching/matching.ts'
import type { Card } from '../../types/card.ts'

interface Props {
    elapsedMs: number
    wrongAttempts: number
    wrongCards: Card[]
    onRestart: () => void
    onBackToSetup: () => void
}

export function MatchingResult({ elapsedMs, wrongAttempts, wrongCards, onRestart, onBackToSetup }: Props) {
    return (
        <Box
            sx={{
                width: 'calc(100% - 32px)',
                maxWidth: 720,
                mx: 'auto',
                my: { xs: 6, md: 10 },
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                p: { xs: 4, sm: 6 },
                bgcolor: 'background.paper',
                border: '3px solid',
                borderColor: 'text.primary',
                boxShadow: 4,
            }}
        >
            <Typography variant="overline" color="text.secondary">MATCH RECORD</Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '3.5rem', sm: '5rem' } }}>
                {formatDuration(elapsedMs)}
            </Typography>

            <Divider sx={{ borderColor: 'text.primary' }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">틀린 횟수 {wrongAttempts}회</Typography>
                <Typography color="text.secondary">
                    {wrongCards.length > 0
                        ? wrongCards.map((card) => card.nameKo).join(' · ')
                        : '틀린 카드가 없습니다.'}
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'text.primary' }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <Button variant="contained" onClick={onRestart}>다시 하기</Button>
                <Button variant="outlined" onClick={onBackToSetup}>설정으로</Button>
            </Box>
        </Box>
    )
}
