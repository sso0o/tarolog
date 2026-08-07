// src/components/FilterTabs.tsx
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
        <div className="filter-tabs">
            <div role="group" aria-label="아르카나 필터">
                {ARCANA_OPTIONS.map((opt) => (
                    <button key={opt.value} type="button" aria-pressed={arcana === opt.value} onClick={() => onArcanaChange(opt.value)}>
                        {opt.label}
                    </button>
                ))}
            </div>
            <div role="group" aria-label="수트 필터">
                {SUIT_OPTIONS.map((opt) => (
                    <button key={opt.value} type="button" aria-pressed={suit === opt.value} onClick={() => onSuitChange(opt.value)}>
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    )
}