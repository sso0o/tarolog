// src/components/dictionary/CardList.tsx
import { Fragment } from 'react'
import type { ReactNode } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { Card } from '../../types/card.ts'

interface Props {
    cards: Card[]
    onSelect: (card: Card) => void
    renderAction?: (card: Card) => ReactNode
}

export function CardList({ cards, onSelect, renderAction }: Props) {
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
                    <ListItem
                        disablePadding
                        secondaryAction={renderAction ? renderAction(card) : undefined}
                    >
                        <ListItemButton
                            onClick={() => onSelect(card)}
                            sx={{
                                minHeight: 72,
                                gap: 3,
                                px: 0,
                                py: 2,
                                pr: renderAction ? 9 : 0,
                                '&:focus-visible': {
                                    outline: '3px solid',
                                    outlineColor: 'secondary.main',
                                    outlineOffset: '-3px',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={import.meta.env.BASE_URL + card.image.slice(1)}
                                alt={card.nameKo}
                                loading="lazy"
                                sx={{ width: 48, aspectRatio: '2/3', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }}
                            />
                            <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body2" fontWeight="bold" sx={{ overflowWrap: 'anywhere' }}>
                                    {card.nameKo}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {card.keywordsUpKo.slice(0, 3).join(' · ')}
                                </Typography>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                    {index < cards.length - 1 && <Divider sx={{ borderColor: 'text.primary' }} />}
                </Fragment>
            ))}
        </List>
    )
}