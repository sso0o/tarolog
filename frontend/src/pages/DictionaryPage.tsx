// src/pages/DictionaryPage.tsx
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { getAllCards, searchCards, filterCards } from '../lib/cards'
import { SearchBar } from '../components/SearchBar'
import { FilterTabs, type ArcanaFilter, type SuitFilter } from '../components/FilterTabs'
import { CardGrid } from '../components/CardGrid'
import { CardDetail } from '../components/CardDetail'
import type { Card } from '../types/card'

export function DictionaryPage() {
    const allCards = useMemo(() => getAllCards(), [])
    const [query, setQuery] = useState('')
    const [arcana, setArcana] = useState<ArcanaFilter>('all')
    const [suit, setSuit] = useState<SuitFilter>('all')
    const [selected, setSelected] = useState<Card | null>(null)

    const visibleCards = useMemo(
        () => filterCards(searchCards(allCards, query), arcana, suit),
        [allCards, query, arcana, suit],
    )

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 4, py: 6 }}>
            <SearchBar value={query} onChange={setQuery} />
            <FilterTabs arcana={arcana} suit={suit} onArcanaChange={setArcana} onSuitChange={setSuit} />
            {selected && <CardDetail card={selected} onClose={() => setSelected(null)} />}
            <CardGrid cards={visibleCards} onSelect={setSelected} />
        </Box>
    )
}