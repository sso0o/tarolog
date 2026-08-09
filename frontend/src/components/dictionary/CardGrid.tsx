// src/components/dictionary/CardGrid.tsx
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import type { Card as CardType } from '../../types/card.ts'

interface Props {
    cards: CardType[]
    onSelect: (card: CardType) => void
}

export function CardGrid({ cards, onSelect }: Props) {
    if (cards.length === 0) {
        return (
            <Typography variant="body2" color="text.disabled" sx={{ py: 16, textAlign: 'center' }}>
                검색 결과가 없습니다.
            </Typography>
        )
    }
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(4, 1fr)', sm: 'repeat(6, 1fr)', md: 'repeat(8, 1fr)' },
                gap: 4,
            }}
        >
            {cards.map((card) => (
                <Card
                    key={card.id}
                    sx={{ '&:hover': { boxShadow: 2 }, transition: 'box-shadow 0.2s' }}
                >
                    <CardActionArea
                        onClick={() => onSelect(card)}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 1 }}
                    >
                        <Box
                            component="img"
                            src={import.meta.env.BASE_URL + card.image.slice(1)}
                            alt={card.nameKo}
                            loading="lazy"
                            sx={{ width: '100%', aspectRatio: '2/3', objectFit: 'contain', borderRadius: '8px' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                            {card.nameKo}
                        </Typography>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    )
}