// src/components/journal/CardPicker.tsx
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { getAllCards, searchCards } from '../../lib/shared/cards.ts'
import type { Card } from '../../types/card'

interface Props {
    open: boolean
    onSelect: (card: Card) => void
    onClose: () => void
}

export function CardPicker({ open, onSelect, onClose }: Props) {
    const allCards = useMemo(() => getAllCards(), [])
    const [query, setQuery] = useState('')
    const filtered = useMemo(() => searchCards(allCards, query), [allCards, query])

    function handleClose() {
        setQuery('')
        onClose()
    }

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { maxHeight: '80vh' } }}
        >
            <Box
                sx={{
                    px: 2, pt: 2, pb: 1,
                    position: 'sticky', top: 0,
                    bgcolor: 'background.paper', zIndex: 1,
                }}
            >
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>카드 선택</Typography>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="카드 이름 또는 키워드 검색..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus={open}
                />
            </Box>
            <List>
                {filtered.map((card) => (
                    <ListItemButton
                        key={card.id}
                        onClick={() => { onSelect(card); handleClose() }}
                        sx={{ minHeight: 56 }}
                    >
                        <ListItemText primary={card.nameKo} secondary={card.nameEn} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    )
}