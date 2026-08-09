// src/components/Flashcard.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import type { StudyDirection } from '../lib/flashcard'
import type { Card as CardType } from '../types/card'

interface Props {
    card: CardType
    direction: StudyDirection
    memorized: boolean
    onToggleMemorized: () => void
}

export function Flashcard({ card, direction, memorized, onToggleMemorized }: Props) {
    const [flipped, setFlipped] = useState(false)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Card sx={{ borderRadius: '32px', boxShadow: 2, width: '100%', maxWidth: 400 }}>
                <CardActionArea
                    onClick={() => setFlipped((f) => !f)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 360,
                        p: 8,
                    }}
                >
                    {flipped ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <Typography variant="h1" sx={{ m: 0 }}>{card.nameKo}</Typography>
                            {direction === 'both' ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="body1" sx={{ m: 0, color: '#3d3d3d' }}>
                                        정방향: {card.meaningUpKo}
                                    </Typography>
                                    <Typography variant="body1" sx={{ m: 0, color: '#3d3d3d' }}>
                                        역방향: {card.meaningRevKo}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography variant="body1" sx={{ m: 0, color: '#3d3d3d' }}>
                                    {direction === 'up' ? card.meaningUpKo : card.meaningRevKo}
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        <Box
                            component="img"
                            src={import.meta.env.BASE_URL + card.image.slice(1)}
                            alt="카드를 눌러 의미 확인"
                            sx={{ borderRadius: '16px', maxWidth: 240, width: '100%', height: 'auto' }}
                        />
                    )}
                </CardActionArea>
            </Card>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={memorized}
                        onChange={onToggleMemorized}
                        size="small"
                        sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'text.primary' } }}
                    />
                }
                label={
                    <Typography variant="body2" color="text.secondary">외웠어요</Typography>
                }
                sx={{ m: 0 }}
            />
        </Box>
    )
}