// src/components/dictionary/CardList.tsx
import { Fragment } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { Card } from '../../types/card.ts'

interface Props {
    cards: Card[]
    onSelect: (card: Card) => void
}

export function CardList({ cards, onSelect }: Props) {
    if (cards.length === 0) {
        return (
            <Typography variant="body2" color="text.disabled" sx={{ py: 16, textAlign: 'center' }}>
                검색 결과가 없습니다.
            </Typography>
        )
    }
    return (
        <List disablePadding>
            {cards.map((card, index) => (
                <Fragment key={card.id}>
                    <ListItemButton onClick={() => onSelect(card)} sx={{ gap: 3, px: 0, py: 2 }}>
                        <Box
                            component="img"
                            src={import.meta.env.BASE_URL + card.image.slice(1)}
                            alt={card.nameKo}
                            loading="lazy"
                            sx={{ width: 48, aspectRatio: '2/3', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }}
                        />
                        <Box>
                            <Typography variant="body2" fontWeight="bold">{card.nameKo}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                {card.keywordsKo.slice(0, 3).join(' · ')}
                            </Typography>
                        </Box>
                    </ListItemButton>
                    {index < cards.length - 1 && <Divider />}
                </Fragment>
            ))}
        </List>
    )
}