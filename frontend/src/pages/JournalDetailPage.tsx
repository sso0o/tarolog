// src/pages/JournalDetailPage.tsx
import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router'
import { getReadingById, deleteReading } from '../lib/journal/journal.ts'
import { getAllCards } from '../lib/shared/cards.ts'
import type { Reading } from '../types/journal'
import type { Card } from '../types/card'

export function JournalDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [reading, setReading] = useState<Reading | null>(null)
    const [confirming, setConfirming] = useState(false)

    const cardMap = useMemo(() => {
        const cards: Card[] = getAllCards()
        return new Map<string, Card>(cards.map((c) => [c.id, c]))
    }, [])

    useEffect(() => {
        if (!id) { navigate('/journal', { replace: true }); return }
        const found = getReadingById(id)
        if (!found) { navigate('/journal', { replace: true }); return }
        setReading(found)
    }, [id, navigate])

    if (!reading) return null

    const date = new Date(reading.createdAt).toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    function handleDelete() {
        if (!id) return
        deleteReading(id)
        navigate('/journal', { replace: true })
    }

    return (
        <Box sx={{ px: 4, py: 4, display: 'flex', flexDirection: 'column', gap: 3, pb: '80px' }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/journal')}
                sx={{ alignSelf: 'flex-start' }}
            >
                목록
            </Button>

            <Typography variant="caption" color="text.secondary">{date}</Typography>

            <Box>
                <Typography variant="overline" color="text.secondary">질문/의도</Typography>
                <Typography variant="body1">{reading.question || '(없음)'}</Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="overline" color="text.secondary">스프레드</Typography>
                <Typography variant="body1">{reading.spread.name}</Typography>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="overline" color="text.secondary">카드 배치</Typography>
                {reading.cards.map((c) => {
                    const card = cardMap.get(c.cardId)
                    return (
                        <Box key={c.position} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                                {c.position}
                            </Typography>
                            <Typography variant="body1">{card?.nameKo ?? c.cardId}</Typography>
                            {c.reversed && <Chip label="역방향" size="small" />}
                        </Box>
                    )
                })}
            </Box>

            <Divider />

            <Box>
                <Typography variant="overline" color="text.secondary">해석</Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {reading.interpretation || '(없음)'}
                </Typography>
            </Box>

            <Button
                color="error"
                variant="outlined"
                onClick={() => setConfirming(true)}
                sx={{ mt: 2, minHeight: 48 }}
            >
                삭제
            </Button>

            <Dialog open={confirming} onClose={() => setConfirming(false)}>
                <DialogTitle>이 리딩 기록을 삭제할까요?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirming(false)}>취소</Button>
                    <Button color="error" onClick={handleDelete}>삭제</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}