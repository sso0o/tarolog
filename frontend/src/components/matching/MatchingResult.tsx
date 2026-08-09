// src/components/MatchingResult.tsx
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 8, px: 4 }}>
            <Typography variant="h1" sx={{ m: 0 }}>{formatDuration(elapsedMs)}</Typography>
            <Typography variant="body2" color="text.secondary">틀린 횟수 {wrongAttempts}회</Typography>

            {wrongCards.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>틀렸던 카드</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                        {wrongCards.map((c) => c.nameKo).join(', ')}
                    </Typography>
                </Box>
            )}

            <Box sx={{ display: 'flex', gap: 4 }}>
                <Button variant="outlined" onClick={onRestart}>다시 하기</Button>
                <Button variant="outlined" onClick={onBackToSetup}>설정으로</Button>
            </Box>
        </Box>
    )
}