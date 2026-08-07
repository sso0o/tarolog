// src/components/CardDetail.tsx
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import type { Card as CardType } from '../types/card'

interface Props {
    card: CardType
    onClose: () => void
}

export function CardDetail({ card, onClose }: Props) {
    return (
        <Card
            role="dialog"
            aria-label={`${card.nameKo} 상세`}
            sx={{ borderRadius: '32px', boxShadow: 4, mb: 4 }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    p: '32px !important',
                }}
            >
                <IconButton
                    onClick={onClose}
                    aria-label="닫기"
                    size="small"
                    sx={{
                        alignSelf: 'flex-end',
                        border: '1px solid',
                        borderColor: 'divider',
                        color: 'text.primary',
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
                <Box
                    component="img"
                    src={import.meta.env.BASE_URL + card.image.slice(1)}
                    alt={card.nameKo}
                    sx={{ borderRadius: '16px', maxWidth: 240, width: '100%', height: 'auto' }}
                />
                <Typography variant="h2" sx={{ m: 0 }}>{card.nameKo}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ m: 0 }}>
                    {card.keywordsKo.join(', ')}
                </Typography>
                <Box component="section" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body2" fontWeight={500}>정방향</Typography>
                    <Typography variant="body1" sx={{ m: 0, color: '#3d3d3d' }}>{card.meaningUpKo}</Typography>
                </Box>
                <Box component="section" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body2" fontWeight={500}>역방향</Typography>
                    <Typography variant="body1" sx={{ m: 0, color: '#3d3d3d' }}>{card.meaningRevKo}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}