// src/components/Flashcard.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import type { StudyDirection } from '../../types/study.ts'
import type { Card as CardType } from '../../types/card.ts'

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
            <Card sx={{ borderRadius: '4px', width: '100%', maxWidth: 400 }}>
                <CardActionArea
                    aria-label={flipped ? '카드 이미지 보기' : '카드 의미 확인'}
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
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 4 }}>
                            <Typography variant="h1" sx={{ m: 0, textAlign: 'center' }}>{card.nameKo}</Typography>
                            {direction === 'both' ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 2 }}>
                                    <Typography variant="body1" color="text.secondary" sx={{ m: 0, textAlign: 'left' }}>
                                        정방향: {card.meaningUpKo}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ m: 0, textAlign: 'left' }}>
                                        역방향: {card.meaningRevKo}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography variant="body1" color="text.secondary" sx={{ m: 0, textAlign: 'left' }}>
                                    {direction === 'up' ? card.meaningUpKo : card.meaningRevKo}
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        <Box
                            component="img"
                            src={import.meta.env.BASE_URL + card.image.slice(1)}
                            alt="카드를 눌러 의미 확인"
                            sx={{ borderRadius: 0, maxWidth: 240, width: '100%', height: 'auto' }}
                        />
                    )}
                </CardActionArea>
            </Card>
            <Button
                type="button"
                variant={memorized ? 'contained' : 'outlined'}
                aria-pressed={memorized}
                onClick={onToggleMemorized}
                sx={{ backgroundColor: memorized ? 'var(--feature-accent)' : 'background.paper' }}
            >
                {memorized ? '✓ 외웠어요' : '외웠어요'}
            </Button>
        </Box>
    )
}
