// src/components/journal/JournalCard.tsx
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { Reading } from '../../types/journal'

interface Props {
    reading: Reading
    onClick: () => void
}

export function JournalCard({ reading, onClick }: Props) {
    const date = new Date(reading.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <Card>
            <CardActionArea onClick={onClick} sx={{ minHeight: 72 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                        <Typography variant="overline" color="text.secondary">
                            {date}
                        </Typography>
                        <Box
                            component="span"
                            sx={{ px: 1, py: 0.25, border: '2px solid', borderColor: 'text.primary', fontSize: '0.75rem', fontWeight: 700 }}
                        >
                            {reading.spread.name}
                        </Box>
                    </Box>
                    <Typography variant="h3">
                        {reading.question || '(질문 없음)'}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}
                    >
                        {reading.interpretation || '(해석 없음)'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
