// src/components/journal/JournalCard.tsx
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
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
                <CardContent>
                    <Typography variant="caption" color="text.secondary">
                        {date} · {reading.spread.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
                        {reading.question || '(질문 없음)'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} noWrap>
                        {reading.interpretation || '(해석 없음)'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}