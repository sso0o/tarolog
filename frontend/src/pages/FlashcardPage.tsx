// src/pages/FlashcardPage.tsx
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { getAllCards } from '../lib/cards'
import { getMemorizedIds, toggleMemorized } from '../lib/progress'
import { Flashcard } from '../components/Flashcard'

export function FlashcardPage() {
    const cards = useMemo(() => getAllCards(), [])
    const [index, setIndex] = useState(0)
    const [memorizedIds, setMemorizedIds] = useState(() => new Set(getMemorizedIds()))

    const card = cards[index]

    function next() {
        setIndex((i) => (i + 1) % cards.length)
    }

    function prev() {
        setIndex((i) => (i - 1 + cards.length) % cards.length)
    }

    function handleToggle() {
        toggleMemorized(card.id)
        setMemorizedIds(new Set(getMemorizedIds()))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, py: 16 }}>
            <Typography variant="body2" color="text.disabled" sx={{ m: 0 }}>
                {index + 1} / {cards.length}
            </Typography>
            <Flashcard card={card} memorized={memorizedIds.has(card.id)} onToggleMemorized={handleToggle} />
            <Box sx={{ display: 'flex', gap: 4 }}>
                <Button variant="outlined" onClick={prev}>이전</Button>
                <Button variant="outlined" onClick={next}>다음</Button>
            </Box>
        </Box>
    )
}