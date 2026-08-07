// src/components/CardGrid.tsx
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import type { Card as CardType } from '../types/card'

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
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
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
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2 }}
                    >
                        <Box
                            component="img"
                            src={import.meta.env.BASE_URL + card.image.slice(1)}
                            alt={card.nameKo}
                            loading="lazy"
                            sx={{ width: '100%', maxWidth: 140, height: 'auto', borderRadius: '8px' }}
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