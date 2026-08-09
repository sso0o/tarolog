// src/pages/DictionaryPage.tsx
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import { getAllCards, searchCards, filterCards } from '../lib/shared/cards.ts'
import { SearchBar } from '../components/dictionary/SearchBar.tsx'
import { FilterTabs, type ArcanaFilter, type SuitFilter } from '../components/dictionary/FilterTabs.tsx'
import { CardGrid } from '../components/dictionary/CardGrid.tsx'
import { CardList } from '../components/dictionary/CardList.tsx'
import { CardDetail } from '../components/dictionary/CardDetail.tsx'
import type { Card } from '../types/card'

type ViewMode = 'grid' | 'list'

const STORAGE_KEY = 'tarolog:dictionary:viewMode'

function getInitialViewMode(): ViewMode {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'list' ? 'list' : 'grid'
}

export function DictionaryPage() {
    const allCards = useMemo(() => getAllCards(), [])
    const [query, setQuery] = useState('')
    const [arcana, setArcana] = useState<ArcanaFilter>('all')
    const [suit, setSuit] = useState<SuitFilter>('all')
    const [selected, setSelected] = useState<Card | null>(null)
    const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode)

    const visibleCards = useMemo(
        () => filterCards(searchCards(allCards, query), arcana, suit),
        [allCards, query, arcana, suit],
    )

    function handleViewModeChange(mode: ViewMode) {
        setViewMode(mode)
        localStorage.setItem(STORAGE_KEY, mode)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 4, py: 6 }}>
            <SearchBar value={query} onChange={setQuery} />
            <FilterTabs arcana={arcana} suit={suit} onArcanaChange={setArcana} onSuitChange={setSuit} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">{visibleCards.length}장</Typography>
                <Box>
                    <IconButton
                        onClick={() => handleViewModeChange('grid')}
                        color={viewMode === 'grid' ? 'primary' : 'inherit'}
                        size="small"
                        aria-label="그리드 뷰"
                    >
                        <GridViewIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleViewModeChange('list')}
                        color={viewMode === 'list' ? 'primary' : 'inherit'}
                        size="small"
                        aria-label="리스트 뷰"
                    >
                        <ViewListIcon />
                    </IconButton>
                </Box>
            </Box>
            {selected && <CardDetail card={selected} onClose={() => setSelected(null)} />}
            {viewMode === 'grid'
                ? <CardGrid cards={visibleCards} onSelect={setSelected} />
                : <CardList cards={visibleCards} onSelect={setSelected} />
            }
        </Box>
    )
}