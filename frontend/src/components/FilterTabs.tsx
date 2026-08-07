// src/components/FilterTabs.tsx
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import type { Arcana, Suit } from '../types/card'

export type ArcanaFilter = Arcana | 'all'
export type SuitFilter = Suit | 'all'

interface Props {
    arcana: ArcanaFilter
    suit: SuitFilter
    onArcanaChange: (arcana: ArcanaFilter) => void
    onSuitChange: (suit: SuitFilter) => void
}

const ARCANA_OPTIONS: { value: ArcanaFilter; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'major', label: '메이저' },
    { value: 'minor', label: '마이너' },
]

const SUIT_OPTIONS: { value: SuitFilter; label: string }[] = [
    { value: 'all', label: '전체 수트' },
    { value: 'wands', label: '완드' },
    { value: 'cups', label: '컵' },
    { value: 'swords', label: '소드' },
    { value: 'pentacles', label: '펜타클' },
]

export function FilterTabs({ arcana, suit, onArcanaChange, onSuitChange }: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ToggleButtonGroup
                value={arcana}
                exclusive
                onChange={(_, v: ArcanaFilter | null) => { if (v) onArcanaChange(v) }}
                aria-label="아르카나 필터"
                sx={{ flexWrap: 'wrap' }}
            >
                {ARCANA_OPTIONS.map((opt) => (
                    <ToggleButton key={opt.value} value={opt.value}>
                        {opt.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <ToggleButtonGroup
                value={suit}
                exclusive
                onChange={(_, v: SuitFilter | null) => { if (v) onSuitChange(v) }}
                aria-label="수트 필터"
                sx={{ flexWrap: 'wrap' }}
            >
                {SUIT_OPTIONS.map((opt) => (
                    <ToggleButton key={opt.value} value={opt.value}>
                        {opt.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    )
}